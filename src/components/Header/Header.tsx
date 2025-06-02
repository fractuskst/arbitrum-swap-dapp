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
        {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} className={styles.button}>
                      Connect Wallet
                    </button>
                  );
                }

                return (
                  <button onClick={openAccountModal} className={cn(styles.button, styles.connected)}>
                    {connector && <img src={connector.icon} alt="wallet icon" className={styles.walletIcon} />}
                    {account.displayName}
                    <ArrowDownIcon className={styles.arrowDownIcon} stroke="#feefcd" />
                  </button>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </header>
  );
};

export default Header;
