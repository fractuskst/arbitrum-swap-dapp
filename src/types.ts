export type Asset = {
  symbol: string;
  address: string;
  decimals: number;
  chainId: string;
  icon: string;
  isNative: boolean;
};

export type SourceType = 'From' | 'To';

export type SwapResultType = 'Success' | 'Failed';
