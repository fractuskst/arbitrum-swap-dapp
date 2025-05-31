import type { Asset } from '../../types';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import styles from './AssetButton.module.css';
import cn from 'classnames';

type Props = {
  asset?: Asset | null;
  isModal?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const AssetButton: React.FC<Props> = ({ asset, isModal, ...rest }) => {
  return (
    <div className={styles.container}>
      <button className={cn(styles.selectBtn, rest.className)} {...rest}>
        {asset ? (
          <>
            <span className={styles.assetName}>{asset.name}</span>
            <img src={asset.icon} alt="coin-icon" className={styles.coinIcon} />
          </>
        ) : (
          'Select asset'
        )}
        {!isModal && (
          <ArrowDownIcon stroke="#362A32" style={{ width: asset ? '16px' : '36px' }} className={styles.arrowDownIcon} />
        )}
      </button>
    </div>
  );
};

export default AssetButton;
