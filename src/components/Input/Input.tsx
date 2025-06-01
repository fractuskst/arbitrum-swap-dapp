import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
    e.preventDefault();
  }
};

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input placeholder="0" className={styles.input} type="number" onKeyDown={handleKeyDown} {...props} />;
};

export default Input;
