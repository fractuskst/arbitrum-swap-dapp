import { publicClient } from '@/configs';
import { encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import { useSendTransaction } from 'wagmi';

export const useTokenApproval = () => {
  const { sendTransactionAsync } = useSendTransaction();

  const approveToken = async (tokenAddress: string, spender: string, amount: string, decimals: number) => {
    try {
      const txHash = await sendTransactionAsync({
        to: tokenAddress as `0x${string}`,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [spender as `0x${string}`, parseUnits(amount, decimals)],
        }),
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });
      return txHash;
    } catch (e) {
      console.error('Approval failed:', e);
      throw new Error('Approval transaction failed');
    }
  };

  return { approveToken };
};
