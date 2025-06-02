import { squid } from './squidClient';

type Props = {
  fromChainId: number;
  fromTokenAddress: string;
  toChainId: number;
  toTokenAddress: string;
  amount: string;
  fromAddress: string | undefined;
  toAddress: string | undefined;
};

export const getSwapQuote = async ({
  fromChainId,
  fromTokenAddress,
  toChainId,
  toTokenAddress,
  fromAddress,
  toAddress,
  amount,
}: Props) => {
  const route = await squid.getRoute({
    fromAddress: fromAddress,
    toAddress: toAddress,
    fromChain: fromChainId.toString(),
    toChain: toChainId.toString(),
    fromToken: fromTokenAddress,
    toToken: toTokenAddress,
    fromAmount: amount,
  });

  return route.route.estimate.toAmount;
};
