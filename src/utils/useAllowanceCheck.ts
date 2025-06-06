import { publicClient } from '@/configs';
import { erc20Abi } from 'viem';

import { parseUnits } from 'viem/utils';

export const useAllowanceCheck = () => {
  const checkAllowance = async (owner: string, spender: string, token: string, amount: string, decimals: number) => {
    try {
      const allowance = await publicClient.readContract({
        address: token as `0x${string}`,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [owner as `0x${string}`, spender as `0x${string}`],
      });

      const requiredAmount = parseUnits(amount, decimals);

      return allowance >= requiredAmount;
    } catch (e) {
      console.error('Error checking allowance:', e);
      return false;
    }
  };
  return { checkAllowance };
};
