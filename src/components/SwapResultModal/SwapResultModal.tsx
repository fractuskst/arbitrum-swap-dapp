import { useStore } from '@/store/StoreContext';
import chest from '@/assets/images/chest.png';
import pirate from '@/assets/images/pirate.png';
import styles from './SwapResultModal.module.css';

const SwapResultModal = () => {
  const { swapResult, setSwapResult, toAsset, toAmount, errorMessage } = useStore();

  const isSuccess = swapResult === 'Success';

  return (
    <div className={styles.container} style={{ background: isSuccess ? '#FEEFCD' : '#FED2CD' }}>
      <p className={styles.swapResult}>{swapResult}!</p>
      <img className={styles.image} src={isSuccess ? chest : pirate} alt="swap result image" />
      {isSuccess ? (
        <div className={styles.receivedInfo}>
          <p>You received</p>
          <p>{`${toAmount} ${toAsset?.icon}`}</p>
        </div>
      ) : (
        <p className={styles.reasonInfo}>{`Reason: ${errorMessage}`}</p>
      )}
      <button onClick={() => setSwapResult(null)} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

export default SwapResultModal;
