import { useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { getSwapQuote } from './getSwapQuote';
import { useStore } from '@/store/StoreContext';
import type { SourceType } from '@/types';
import { parseUnits } from 'viem';

export const useDebouncedQuote = () => {
  const { accountAddress, fromAsset, toAsset, setToAmount, setFromAmount, setErrorMessage } = useStore();

  const fetchQuote = useCallback(
    async (source: SourceType, amount: string) => {
      setErrorMessage('');
      if (!fromAsset || !toAsset) return;

      const isFrom = source === 'From';

      if (!accountAddress) {
        setErrorMessage('Please connect your wallet before entering the amount.');
        return;
      }

      if (!amount || isNaN(Number(amount)) || Number(amount) === 0) {
        if (isFrom) {
          setToAmount('');
        } else {
          setFromAmount('');
        }
        return;
      }

      try {
        const amountInUnits = parseUnits(amount, isFrom ? fromAsset.decimals : toAsset.decimals).toString();

        const quote = await getSwapQuote({
          fromChainId: isFrom ? fromAsset.chainId : toAsset.chainId,
          fromTokenAddress: isFrom ? fromAsset.address : toAsset.address,
          toChainId: isFrom ? toAsset.chainId : fromAsset.chainId,
          toTokenAddress: isFrom ? toAsset.address : fromAsset.address,
          fromAddress: accountAddress,
          toAddress: accountAddress,
          amount: amountInUnits,
        });

        const normalized = (Number(quote) / 10 ** (isFrom ? toAsset.decimals : fromAsset.decimals)).toString();

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
        console.error(error.message);
      }
    },
    [fromAsset, toAsset, setToAmount, setFromAmount, setErrorMessage, accountAddress],
  );

  return useMemo(() => debounce(fetchQuote, 1000), [fetchQuote]);
};
