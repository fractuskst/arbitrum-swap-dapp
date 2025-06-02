import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/StoreContext';
import SwapInputSection from '../SwapInputSection/SwapInputSection';
import { useDebouncedQuote } from '@/utils/useDebouncedQuote';

const Form = observer(() => {
  const {
    fromAsset,
    toAsset,
    fromAmount,
    toAmount,
    showFromModal,
    showToModal,
    setFromAmount,
    setToAmount,
    isApproved,
    errorMessage,
    inputSource,
  } = useStore();

  const debouncedQuote = useDebouncedQuote();

  const handleFromAmountChange = (amount: string) => {
    setFromAmount(amount);
    debouncedQuote('From', amount);
  };

  const handleToAmountChange = (amount: string) => {
    setToAmount(amount);
    debouncedQuote('To', amount);
  };

  return (
    <div className={styles.container}>
      <SwapInputSection
        label="From"
        asset={fromAsset}
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
        showModal={showFromModal}
        errorMessage={errorMessage}
        inputSource={inputSource}
      />

      <SwapInputSection
        label="To"
        asset={toAsset}
        amount={toAmount}
        onAmountChange={handleToAmountChange}
        showModal={showToModal}
        errorMessage={errorMessage}
        inputSource={inputSource}
      />

      {fromAsset && toAsset && !errorMessage && (
        <button className={styles.swapButton}>{isApproved ? 'Swap' : 'Approve'}</button>
      )}
    </div>
  );
});

export default Form;
