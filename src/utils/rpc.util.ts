/**
 * Enum tên chain chuẩn
 */
export enum Chain {
  BASE = 'base',
  OP_BNB = 'op-bnb',
  OP = 'op',
  BSC = 'bsc',
  POL = 'pol',
}

/**
 * Danh sách RPC URL cho từng chain (mainnet/testnet)
 */
const RPC_URLS: Record<Chain, { mainnet: string; testnet?: string }> = {
  [Chain.BASE]: {
    mainnet: 'https://mainnet.base.org',
    testnet: 'https://sepolia.base.org',
  },
  [Chain.OP_BNB]: {
    mainnet: 'https://opbnb-mainnet-rpc.bnbchain.org',
    testnet: 'https://opbnb-testnet-rpc.bnbchain.org',
  },
  [Chain.OP]: {
    mainnet: 'https://optimism-mainnet.public.blastapi.io',
    testnet: 'https://sepolia.optimism.io',
  },
  [Chain.BSC]: {
    mainnet: 'https://bsc-dataseed.bnbchain.org',
    testnet: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
  },
  [Chain.POL]: {
    mainnet: 'https://polygon-rpc.com',
    testnet: 'https://rpc-mumbai.maticvigil.com',
  },
};


/**
 * Lấy RPC URL theo chain và môi trường
 * @param chain Chain
 * @param testnet true nếu lấy testnet, mặc định mainnet
 * @returns RPC URL hoặc undefined nếu chưa cấu hình
 */
export function getRpcUrl(chain: Chain, testnet = false): string | undefined {
  const entry = RPC_URLS[chain];
  if (!entry) return undefined;
  return testnet ? entry.testnet : entry.mainnet;
}
