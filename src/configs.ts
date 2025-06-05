import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';
import { PROJECT_ID } from './constants';
import { Squid } from '@0xsquid/sdk';
import { INTEGRATOR_ID } from './constants';
import { createPublicClient, http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Pirate Bay',
  projectId: PROJECT_ID,
  chains: [arbitrum],
});

export const squid = new Squid({
  baseUrl: 'https://v2.api.squidrouter.com',
  integratorId: INTEGRATOR_ID,
});

export const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});
