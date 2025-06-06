import Header from './components/Header/Header';
import Form from './components/Form/Form';
import SwapResultModal from './components/SwapResultModal/SwapResultModal';
import ArbitrumLogo from './assets/images/Arbitrum.svg';
import { useStore } from './store/StoreContext';
import styles from './App.module.css';

const App = () => {
  const { swapResult } = useStore();

  return (
    <div className={styles.container}>
      <Header />
      {swapResult ? <SwapResultModal /> : <Form />}
      <a className={styles.logo} href="https://arbitrum.io" target="_blank" rel="noopener noreferrer">
        <img src={ArbitrumLogo} alt="Arbitrum logo" />
      </a>
    </div>
  );
};

export default App;
