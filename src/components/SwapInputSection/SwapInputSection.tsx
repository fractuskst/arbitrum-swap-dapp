import type { Asset, SourceType } from '@/types';
import Input from '../Input/Input';
import AssetButton from '../AssetButton/AssetButton';
import Modal from '../Modal/Modal';

import styles from './SwapInputSection.module.css';

type Props = {
  label: SourceType;
  asset: Asset | null;
  amount: string;
  onAmountChange: (value: string) => void;
  showModal: boolean;
  errorMessage: string;
  inputSource: SourceType | null;
};

const SwapInputSection: React.FC<Props> = ({
  label,
  asset,
  amount,
  onAmountChange,
  showModal,
  errorMessage,
  inputSource,
}) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      {asset ? (
        <div className={styles.inputContainer}>
          <Input value={amount === '' ? '' : Number(amount)} onChange={(e) => onAmountChange(e.target.value)} />
          <AssetButton asset={asset} SourceType={label} className={styles.smallStyleSelectBtn} />
        </div>
      ) : (
        <AssetButton SourceType={label} />
      )}
      {showModal && <Modal SourceType={label} />}
      {errorMessage && label === inputSource && <span className={styles.error}>{errorMessage}</span>}
    </>
  );
};

export default SwapInputSection;
