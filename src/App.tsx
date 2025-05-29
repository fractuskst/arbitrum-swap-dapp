import Header from './components/Header/Header';
import styles from './App.module.css';
import ArbitrumLogo from './assets/images/Arbitrum.svg';
import Form from './components/Form/Form';

const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Form />
      <img src={ArbitrumLogo} alt="Arbitrum logo" className={styles.logo} />
    </div>
  );
};

export default App;
