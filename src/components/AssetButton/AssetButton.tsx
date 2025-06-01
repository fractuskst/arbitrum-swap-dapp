import type { Asset, SourceType } from '../../types';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';
import styles from './AssetButton.module.css';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/StoreContext';

type Props = {
  asset?: Asset | null;
  SourceType: SourceType;
  hideArrow?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const AssetButton: React.FC<Props> = observer(({ asset, SourceType, hideArrow, ...rest }) => {
  const store = useStore();

  const handleShowModal = (type: SourceType) => {
    if (type === 'From') {
      store.setShowFromModal(true);
    } else {
      store.setShowToModal(true);
    }
  };

  return (
    <div className={styles.container}>
      <button className={cn(styles.selectBtn, rest.className)} onClick={() => handleShowModal(SourceType)} {...rest}>
        {asset ? (
          <>
            <span className={styles.assetName}>{asset.symbol}</span>
            <img src={asset.icon} alt="coin-icon" className={styles.coinIcon} />
          </>
        ) : (
          'Select asset'
        )}
        {!hideArrow && (
          <ArrowDownIcon stroke="#362A32" style={{ width: asset ? '16px' : '36px' }} className={styles.arrowDownIcon} />
        )}
      </button>
    </div>
  );
});

export default AssetButton;
