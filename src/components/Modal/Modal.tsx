import type { Asset, SourceType } from '../../types';
import styles from './Modal.module.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/StoreContext';

import AssetButton from '../AssetButton/AssetButton';
import { ASSETS } from '@/constants';

type Props = {
  SourceType: SourceType;
};

const Modal: React.FC<Props> = observer(({ SourceType }) => {
  const { fromAsset, toAsset, setFromAsset, setToAsset, setShowFromModal, setShowToModal, setFromAmount, setToAmount } =
    useStore();

  const handleSelectAsset = (asset: Asset, type: SourceType) => {
    if (type === 'From') {
      if (toAsset?.address === asset.address) {
        setToAsset(null);
      }
      setFromAsset(asset);
      setShowFromModal(false);
    } else {
      if (fromAsset?.address === asset.address) {
        setFromAsset(null);
      }
      setToAsset(asset);
      setShowToModal(false);
    }

    setFromAmount('');
    setToAmount('');
  };

  const modalSetters = {
    From: (value: boolean) => setShowFromModal(value),
    To: (value: boolean) => setShowToModal(value),
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.assetList}>
          {ASSETS.map((asset) => (
            <AssetButton
              key={asset.address}
              asset={asset}
              hideArrow={true}
              SourceType={SourceType}
              onClick={() => handleSelectAsset(asset, SourceType)}
              style={{ height: '96px' }}
            />
          ))}
        </div>
        <button className={styles.closeModalButton} onClick={() => modalSetters[SourceType](false)}>
          Close
        </button>
      </div>
    </div>
  );
});

export default Modal;
