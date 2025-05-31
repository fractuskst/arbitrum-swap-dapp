import Header from './components/Header/Header';
import styles from './App.module.css';
import ArbitrumLogo from './assets/images/Arbitrum.svg';
import Form from './components/Form/Form';

const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Form />
      <a className={styles.logo} href="https://arbitrum.io" target="_blank" rel="noopener noreferrer">
        <img src={ArbitrumLogo} alt="Arbitrum logo" />
      </a>
    </div>
  );
};

export default App;
