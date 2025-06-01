import { Squid } from '@0xsquid/sdk';

const integratorId = 'pirate-bay-c8ace413-c096-4db5-8bc8-0ea325b74d54';

const squid = new Squid({
  baseUrl: 'https://v2.api.squidrouter.com',
  integratorId: integratorId,
});

await squid.init();

type Props = {
  fromChainId: number;
  fromTokenAddress: string;
  toChainId: number;
  toTokenAddress: string;
  amount: string;
  fromAddress: `0x${string}` | undefined;
  toAddress: `0x${string}` | undefined;
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
