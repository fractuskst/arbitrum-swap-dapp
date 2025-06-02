import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';
import { PROJECT_ID } from './constants';

export const config = getDefaultConfig({
  appName: 'Pirate Bay',
  projectId: PROJECT_ID,
  chains: [arbitrum],
});
