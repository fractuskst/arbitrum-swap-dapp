import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Pirate Bay',
  projectId: '05b93c29bfbad9e2845d0319c6008dda',
  chains: [arbitrum],
});
