import type { Asset } from '../../types';
import styles from './Modal.module.css';

import usdtIcon from '@/assets/icons/usdt.png';
import usdcIcon from '@/assets/icons/usdc.png';
import ethIcon from '@/assets/icons/eth.png';

type Props = {
  onSelectAsset: (asset: Asset, isFromAsset: boolean) => void;
  setShowModal: (showModal: boolean) => void;
  isFromAsset: boolean;
};

const assets: Asset[] = [
  { id: '1', name: 'USDT', icon: usdtIcon },
  { id: '2', name: 'USDC', icon: usdcIcon },
  { id: '3', name: 'ETH', icon: ethIcon },
];

const Modal: React.FC<Props> = ({ onSelectAsset, setShowModal, isFromAsset }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.assetList}>
          {assets.map((asset) => (
            <button key={asset.id} className={styles.modalAssetBtn} onClick={() => onSelectAsset(asset, isFromAsset)}>
              {asset.name}
              <img src={asset.icon} alt="coinIcon" className={styles.coinIcon} />
            </button>
          ))}
        </div>
        <button className={styles.closeModalButton} onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
