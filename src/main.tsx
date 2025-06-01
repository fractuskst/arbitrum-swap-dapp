import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StoreContext } from './store/StoreContext.ts';
import { store } from './store/store.ts';
import App from './App.tsx';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './wagmi.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider modalSize="compact">
        <StrictMode>
          <StoreContext.Provider value={store}>
            <App />
          </StoreContext.Provider>
        </StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
