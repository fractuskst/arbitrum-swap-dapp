import { useStore } from '@/store/StoreContext';
import { useBalance } from 'wagmi';
import { parseUnits } from 'viem';

export const useBalanceCheck = () => {
  const { accountAddress, fromAsset } = useStore();

  const { data: fromAssetBalance } = useBalance({
    address: accountAddress as `0x${string}`,
    token: fromAsset?.isNative ? undefined : (fromAsset?.address as `0x${string}`),
    chainId: Number(fromAsset?.chainId),
  });

  const checkBalance = (amount: string) => {
    if (!accountAddress || !fromAsset || !fromAssetBalance) return true;
    const amountInUnits = parseUnits(amount, fromAsset.decimals);
    return BigInt(amountInUnits) <= BigInt(fromAssetBalance.value);
  };

  return { checkBalance };
};
