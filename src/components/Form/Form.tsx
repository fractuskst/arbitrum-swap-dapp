import { useState } from 'react';
import type { Asset } from '../../types';
import AssetButton from '../AssetButton/AssetButton';
import Modal from '../Modal/Modal';

import styles from './Form.module.css';

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
      <AssetButton asset={fromAsset} label="From" onClick={() => setShowFromModal(true)} />
      <AssetButton asset={toAsset} label="To" onClick={() => setShowToModal(true)} />

      {showFromModal && <Modal onSelectAsset={handleSelectAsset} setShowModal={setShowFromModal} isFromAsset={true} />}
      {showToModal && <Modal onSelectAsset={handleSelectAsset} setShowModal={setShowToModal} isFromAsset={false} />}
    </div>
  );
};

export default Form;
