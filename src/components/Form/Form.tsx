import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/StoreContext';
import SwapInputSection from '../SwapInputSection/SwapInputSection';
import { useDebouncedQuote } from '@/utils/useDebouncedQuote';

const Form = observer(() => {
  const store = useStore();
  const { fromAsset, toAsset, fromAmount, toAmount, showFromModal, showToModal, setFromAmount, setToAmount, isApproved } =
    store;

  const debouncedQuote = useDebouncedQuote();

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    debouncedQuote('From', value);
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    debouncedQuote('To', value);
  };

  return (
    <div className={styles.container}>
      <SwapInputSection
        label="From"
        asset={fromAsset}
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
        showModal={showFromModal}
      />

      <SwapInputSection
        label="To"
        asset={toAsset}
        amount={toAmount}
        onAmountChange={handleToAmountChange}
        showModal={showToModal}
      />

      {fromAsset && toAsset && <button className={styles.swapButton}>{isApproved ? 'Swap' : 'Approve'}</button>}
    </div>
  );
});

export default Form;
