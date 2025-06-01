import { useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { getSwapQuote } from './getSwapQuote';
import { useStore } from '@/store/StoreContext';
import type { SourceType } from '@/types';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';

export const useDebouncedQuote = () => {
  const store = useStore();
  const account = useAccount();

  const { fromAsset, toAsset, setToAmount, setFromAmount } = store;

  const fetchQuote = useCallback(
    async (source: SourceType, amount: string) => {
      if (!fromAsset || !toAsset) return;

      const isFrom = source === 'From';

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
          fromAddress: account.address,
          toAddress: account.address,
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
        console.error(error?.response?.data?.message || error);
      }
    },
    [fromAsset, toAsset, setToAmount, setFromAmount, account.address],
  );

  return useMemo(() => debounce(fetchQuote, 700), [fetchQuote]);
};
