import type { Asset } from '../../types';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';
import styles from './AssetButton.module.css';

type Props = {
  asset?: Asset | null;
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const AssetButton: React.FC<Props> = ({ asset, label, ...rest }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <button className={styles.selectBtn} {...rest}>
        {asset ? (
          <>
            <span className={styles.assetName}>{asset.name}</span>
            <img src={asset.icon} alt="coin-icon" className={styles.coinIcon} />
          </>
        ) : (
          'Select asset'
        )}
        <img src={arrowDownIcon} alt="arrow-down-icon" className={styles.coinIcon} />
      </button>
    </div>
  );
};

export default AssetButton;
