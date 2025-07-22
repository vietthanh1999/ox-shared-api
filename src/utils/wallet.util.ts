import { ethers, Wallet } from 'ethers';
import { WalletDto } from '../dto/wallet.dto';

/**
 * Lấy ví chính từ biến môi trường PRIMARY_WALLET_MNEMONIC
 * @returns WalletDto (address, privateKey, mnemonic)
 * @throws Nếu biến môi trường không được thiết lập
 */
export function getPrimaryWallet(): WalletDto {
  // 1. Tạo wallet từ mnemonic
  const mnemonic = process.env.PRIMARY_WALLET_MNEMONIC;
  if (!mnemonic) {
    throw new Error('PRIMARY_WALLET_MNEMONIC is not set');
  }
  return getWalletFromMnemonic(mnemonic);
}

/**
 * Tạo WalletDto từ mnemonic
 * @param mnemonic Chuỗi mnemonic 12/24 từ
 * @returns WalletDto (address, privateKey, mnemonic)
 */
export function getWalletFromMnemonic(mnemonic: string): WalletDto {
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: mnemonic,
  };
}

/**
 * Parse chuỗi wallet dạng 'mnemonic|...' thành WalletDto
 * @param walletStr Chuỗi chứa mnemonic (có thể kèm thông tin khác, phân tách bởi |)
 * @returns WalletDto
 */
export function parseWallet(walletStr: string): WalletDto {
  const [mnemonic, ...rest] = walletStr.split('|');
  return getWalletFromMnemonic(mnemonic);
}

/**
 * Tạo ví mới ngẫu nhiên (mnemonic 12 từ)
 * @param strength Số từ mnemonic (mặc định 12)
 * @returns WalletDto (address, privateKey, mnemonic)
 * @throws Nếu tạo ví thất bại
 */
export function createRandomWalletFromMnemonic(strength: number = 12): WalletDto {
  const wallet = Wallet.createRandom();

  const mnemonic = wallet.mnemonic?.phrase || '';
  if (!mnemonic) {
    throw new Error('Failed to create wallet');
  }
  
  return getWalletFromMnemonic(mnemonic);
}
