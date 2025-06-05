import usdtIcon from '@/assets/icons/usdt.png';
import usdcIcon from '@/assets/icons/usdc.png';
import ethIcon from '@/assets/icons/eth.png';
import type { Asset } from '@/types';

export const ASSETS: Asset[] = [
  {
    symbol: 'USDT',
    address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    decimals: 6,
    chainId: '42161',
    icon: usdtIcon,
  },
  {
    symbol: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6,
    chainId: '42161',
    icon: usdcIcon,
  },
  {
    symbol: 'ETH',
    address: '0xEEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    chainId: '42161',
    icon: ethIcon,
  },
];

export const PROJECT_ID = '05b93c29bfbad9e2845d0319c6008dda';

export const INTEGRATOR_ID = 'pirate-bay-c8ace413-c096-4db5-8bc8-0ea325b74d54';
