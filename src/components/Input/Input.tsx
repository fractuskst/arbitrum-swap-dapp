import styles from './Input.module.css';

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
    e.preventDefault();
  }
};

const Input = () => {
  return <input type="number" className={styles.input} onKeyDown={handleKeyDown} />;
};

export default Input;
