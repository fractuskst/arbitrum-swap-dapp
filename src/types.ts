export type Asset = {
  symbol: string;
  address: string;
  decimals: number;
  chainId: string;
  icon?: string;
};

export type SourceType = 'From' | 'To';
