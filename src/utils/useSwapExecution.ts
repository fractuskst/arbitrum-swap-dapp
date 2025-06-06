import { publicClient } from '@/configs';
import type { Asset } from '@/types';
import { encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import { useSendTransaction } from 'wagmi';

export const useSwapExecution = () => {
  const { sendTransactionAsync } = useSendTransaction();

  const executeSwap = async (spender: string, fromAsset: Asset, amount: string) => {
    try {
      if (fromAsset.isNative) {
        const txHash = await sendTransactionAsync({
          to: spender as `0x${string}`,
          value: parseUnits(amount, fromAsset.decimals),
        });
        return txHash;
      }

      const txHash = await sendTransactionAsync({
        to: fromAsset.address as `0x${string}`,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: 'transfer',
          args: [spender as `0x${string}`, parseUnits(amount, fromAsset.decimals)],
        }),
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });
      return txHash;
    } catch (error) {
      console.error('Swap execution failed:', error);
      throw new Error('Swap failed');
    }
  };

  return { executeSwap };
};
