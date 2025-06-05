import { useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useStore } from '@/store/StoreContext';
import type { SourceType } from '@/types';
import { parseUnits } from 'viem';
import { formatUnits } from 'ethers';
import { squid } from '@/configs';
import { type OnChainExecutionData } from '@0xsquid/squid-types';

export const useSwapQuoteFetcher = () => {
  const { accountAddress, setSpenderAddress, fromAsset, toAsset, setToAmount, setFromAmount, setErrorMessage } = useStore();

  const fetchQuote = useCallback(
    async (source: SourceType, amount: string) => {
      const isFrom = source === 'From';

      if (!fromAsset || !toAsset) return;
      if (!accountAddress) {
        setErrorMessage('Please connect your wallet before entering the amount.');
        return;
      }

      try {
        const amountInUnits = parseUnits(amount, isFrom ? fromAsset.decimals : toAsset.decimals).toString();

        const { route } = await squid.getRoute({
          fromAddress: accountAddress,
          toAddress: accountAddress,
          fromChain: isFrom ? fromAsset.chainId : toAsset.chainId,
          toChain: isFrom ? toAsset.chainId : fromAsset.chainId,
          fromToken: isFrom ? fromAsset.address : toAsset.address,
          toToken: isFrom ? toAsset.address : fromAsset.address,
          fromAmount: amountInUnits,
        });

        const quote = route.estimate.toAmount;
        const txRequest = route.transactionRequest as OnChainExecutionData;

        const spender = txRequest.target;
        setSpenderAddress(spender);

        const normalized = formatUnits(quote, isFrom ? toAsset.decimals : fromAsset.decimals);
        const rounded = Number(normalized).toFixed(4);

        if (isFrom) {
          setToAmount(rounded);
        } else {
          setFromAmount(rounded);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message = error?.response?.data?.message;
        setErrorMessage(message || error.message || 'Unexpected error while fetching quote.');
        console.error(error);
      }
    },
    [fromAsset, toAsset, setToAmount, setFromAmount, setErrorMessage, accountAddress, setSpenderAddress],
  );

  return useMemo(() => debounce(fetchQuote, 1000), [fetchQuote]);
};
