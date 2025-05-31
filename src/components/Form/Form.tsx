import { useState } from 'react';
import type { Asset } from '../../types';
import AssetButton from '../AssetButton/AssetButton';
import Modal from '../Modal/Modal';

import styles from './Form.module.css';
import Input from '../Input/Input';

const Form = () => {
  const [fromAsset, setFromAsset] = useState<Asset | null>(null);
  const [toAsset, setToAsset] = useState<Asset | null>(null);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  const handleSelectAsset = (asset: Asset, isFromAsset: boolean) => {
    if (isFromAsset) {
      setFromAsset(asset);
      setShowFromModal(false);
    } else {
      setToAsset(asset);
      setShowToModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>From</label>
      {fromAsset ? (
        <div className={styles.inputContainer}>
          <Input />
          <AssetButton asset={fromAsset} onClick={() => setShowFromModal(true)} className={styles.smallStyleSelectBtn} />
        </div>
      ) : (
        <AssetButton onClick={() => setShowFromModal(true)} />
      )}

      <label className={styles.label}>To</label>
      {toAsset ? (
        <div className={styles.inputContainer}>
          <Input />
          <AssetButton asset={toAsset} onClick={() => setShowToModal(true)} className={styles.smallStyleSelectBtn} />
        </div>
      ) : (
        <AssetButton onClick={() => setShowToModal(true)} />
      )}

      {fromAsset && toAsset && <button className={styles.swapButton}>Approve</button>}

      {showFromModal && <Modal onSelectAsset={handleSelectAsset} setShowModal={setShowFromModal} isFromAsset={true} />}
      {showToModal && <Modal onSelectAsset={handleSelectAsset} setShowModal={setShowToModal} isFromAsset={false} />}
    </div>
  );
};

export default Form;
