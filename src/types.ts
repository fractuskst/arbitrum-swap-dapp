export type Asset = {
  symbol: string;
  address: string;
  decimals: number;
  chainId: number;
  icon?: string;
};

export type SourceType = 'From' | 'To';
