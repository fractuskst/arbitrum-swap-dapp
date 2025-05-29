import styles from './Header.module.css';
import logo from '@/assets/images/Logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <button className={styles.button}>Connect wallet</button>
    </header>
  );
};

export default Header;
