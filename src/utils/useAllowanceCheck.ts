import { publicClient } from '@/configs';
import { erc20Abi } from 'viem';

import { parseUnits } from 'viem/utils';

export const useAllowanceCheck = () => {
  return async (owner: `0x${string}`, spender: `0x${string}`, token: `0x${string}`, amount: string, decimals: number) => {
    try {
      const result = await publicClient.readContract({
        address: token,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [owner, spender],
      });

      const requiredAmount = parseUnits(amount, decimals);

      return result >= requiredAmount;
    } catch (err) {
      console.error('Error checking allowance:', err);
      return false;
    }
  };
};
