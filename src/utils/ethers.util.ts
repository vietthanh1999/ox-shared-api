import { Wallet, HDNodeWallet, parseEther, formatEther, JsonRpcProvider, Provider, TransactionResponse, Contract, TransactionRequest, FeeData } from 'ethers';

/**
 * Tạo HDNodeWallet từ mnemonic (BIP39 phrase)
 * @param mnemonic Chuỗi mnemonic 12/24 từ
 * @returns HDNodeWallet (có thể dùng như Wallet)
 */
export function createWalletFromMnemonic(mnemonic: string): HDNodeWallet {
    return Wallet.fromPhrase(mnemonic);
}

/**
 * Tạo Wallet từ private key
 * @param privateKey Private key dạng hex (0x...)
 * @returns Wallet
 */
export function createWalletFromPrivateKey(privateKey: string): Wallet {
    return new Wallet(privateKey);
}

/**
 * Tạo provider từ RPC URL
 * @param rpcUrl Địa chỉ RPC (https://... hoặc wss://...)
 * @returns Provider (JsonRpcProvider)
 */
export function createProvider(rpcUrl: string): Provider {
    return new JsonRpcProvider(rpcUrl);
}

/**
 * Lấy balance (ETH) của địa chỉ
 * @param address Địa chỉ ví (0x...)
 * @param provider Provider đã khởi tạo
 * @returns Số dư dạng string (ETH)
 */
export async function getBalance(address: string, provider: Provider): Promise<string> {
    const balance = await provider.getBalance(address);
    return formatEther(balance);
}

/**
 * Lấy balance (ETH, native coin) dạng bigint
 */
export async function getEthBalanceBigint(address: string, provider: Provider): Promise<bigint> {
    return await provider.getBalance(address);
}

/**
 * Lấy balance token ERC20 (hoặc BEP20, v.v.)
 */
export async function getTokenBalance(address: string, tokenAddress: string, provider: Provider, abi: any = [
    'function balanceOf(address) view returns (uint256)'
]): Promise<bigint> {
    const contract = new Contract(tokenAddress, abi, provider);
    return await contract.balanceOf(address);
}

/**
 * Gửi transaction đơn giản (chuyển ETH)
 */
export async function sendTransaction(wallet: Wallet, to: string, valueEth: string, provider: Provider): Promise<TransactionResponse> {
    const tx = {
        to,
        value: parseEther(valueEth),
    };
    const connectedWallet = wallet.connect(provider);
    return connectedWallet.sendTransaction(tx);
}

/**
 * Gửi toàn bộ số dư ETH (sau khi trừ phí) từ ví này sang ví khác, có retry tăng phí nếu lỗi gas
 * @param wallet Wallet nguồn (có privateKey)
 * @param toAddress Địa chỉ nhận
 * @param provider Provider
 * @param maxRetry Số lần thử tối đa (mặc định 3)
 * @returns hash giao dịch nếu thành công
 */
export async function sendAllEthWithRetry(wallet: Wallet, toAddress: string, provider: Provider, maxRetry = 3): Promise<string> {
    const balance = await provider.getBalance(wallet.address);
    for (let attempt = 1; attempt <= maxRetry; attempt++) {
        try {
            const txResponse = await sendAllEthTx(wallet, toAddress, balance, provider, attempt);
            await txResponse.wait();
            return txResponse.hash;
        } catch (error: any) {
            if (attempt >= maxRetry || !isGasError(error)) {
                throw error;
            }
            // Có thể log hoặc tăng fee
        }
    }
    throw new Error('Unexpected error in sendAllEthWithRetry');
}

/**
 * Gửi toàn bộ số dư ETH (sau khi trừ phí) với fee động
 */
export async function sendAllEthTx(
    wallet: Wallet,
    toAddress: string,
    balance: bigint,
    provider: Provider,
    attempt: number = 1
): Promise<TransactionResponse> {
    const feeData: FeeData = await provider.getFeeData();
    const gasLimit = BigInt(21000);

    // 100: 100%, 105: 105%, 110: 110%
    const feeMultiplier = [100, 105, 110][attempt - 1] || 110;
    const txParams: TransactionRequest = {
        to: toAddress,
        gasLimit,
    };

     // Tính phí theo EIP-1559 hoặc legacy
    if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        const maxPriorityFeePerGas = BigInt(feeData.maxPriorityFeePerGas.toString());
        const maxFeePerGas = BigInt(feeData.maxFeePerGas.toString());
        txParams.maxPriorityFeePerGas = (maxPriorityFeePerGas * BigInt(feeMultiplier)) / BigInt(100);
        txParams.maxFeePerGas = (maxFeePerGas * BigInt(feeMultiplier)) / BigInt(100);
        txParams.type = 2;
    } else if (feeData.gasPrice) {
        const gasPrice = BigInt(feeData.gasPrice.toString());
        txParams.gasPrice = (gasPrice * BigInt(feeMultiplier)) / BigInt(100);
    }

    // Tính số coin có thể gửi sau khi trừ phí
    const feePerGas = txParams.maxFeePerGas ?? txParams.gasPrice ?? BigInt(0);
    const fee = gasLimit * BigInt(feePerGas.toString());
    const value = balance - fee;
    if (value <= 0) {
        throw new Error('Ví không đủ coin để trả phí');
    }
    return wallet.sendTransaction({ ...txParams, value });
}

/**
 * Kiểm tra lỗi liên quan đến gas/fee
 */
export function isGasError(error: any): boolean {
    const gasErrors = [
        'insufficient funds for gas',
        'transaction underpriced',
        'replacement transaction underpriced',
        'gas too low',
        'intrinsic gas too low',
        'max fee per gas less than block base fee',
    ];
    const message = (error?.message || '').toLowerCase();
    return gasErrors.some((e) => message.includes(e));
}