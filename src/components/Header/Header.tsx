import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import styles from './Header.module.css';
import logo from '@/assets/images/Logo.svg';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import cn from 'classnames';
import { useStore } from '@/store/StoreContext';
import { useEffect } from 'react';

const Header = () => {
  const { address, connector } = useAccount();
  const { setAccountAddress } = useStore();

  useEffect(() => {
    setAccountAddress(address ?? '');
  }, [address, setAccountAddress]);

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />

      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          const connected = mounted && account && chain;

          if (!mounted) {
            return <div style={{ opacity: 0, pointerEvents: 'none' }} />;
          }

          return (
            <div>
              {!connected ? (
                <button onClick={openConnectModal} className={styles.button} aria-label="Connect wallet">
                  Connect Wallet
                </button>
              ) : (
                <button onClick={openAccountModal} className={cn(styles.button, styles.connected)} title={account.address}>
                  {connector && <img src={connector.icon} alt={connector.name} className={styles.walletIcon} />}
                  {account.displayName}
                  <ArrowDownIcon className={styles.arrowDownIcon} stroke="#feefcd" />
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </header>
  );
};

export default Header;
