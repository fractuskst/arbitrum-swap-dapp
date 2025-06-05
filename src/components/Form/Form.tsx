import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/StoreContext';
import SwapInputSection from '../SwapInputSection/SwapInputSection';
import { useSwapQuoteFetcher } from '@/utils/useSwapQuoteFetcher';
import { useBalanceCheck } from '@/utils/useBalanceCheck';
import { useAllowanceCheck } from '@/utils/useAllowanceCheck';

const Form = observer(() => {
  const {
    accountAddress,
    spenderAddress,
    fromAsset,
    toAsset,
    fromAmount,
    toAmount,
    showFromModal,
    showToModal,
    setFromAmount,
    setToAmount,
    isApproved,
    setIsApproved,
    errorMessage,
    setErrorMessage,
    inputSource,
    setInputSource,
  } = useStore();

  const checkAllowance = useAllowanceCheck();
  const { checkBalance } = useBalanceCheck();
  const getDebouncedQuote = useSwapQuoteFetcher();

  const handleActionClick = async () => {
    if (!accountAddress || !spenderAddress || !fromAsset || !fromAmount) return;
    if (fromAsset.address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      setIsApproved(true);
      return;
    }
    if (!isApproved) {
      const hasAllowance = await checkAllowance(
        accountAddress as `0x${string}`,
        spenderAddress as `0x${string}`,
        fromAsset.address as `0x${string}`,
        fromAmount,
        fromAsset.decimals,
      );

      setIsApproved(hasAllowance);
    }

    const hasAllowance = await checkAllowance(
      accountAddress as `0x${string}`,
      spenderAddress as `0x${string}`,
      fromAsset.address as `0x${string}`,
      fromAmount,
      fromAsset.decimals,
    );

    setIsApproved(hasAllowance);
  };

  const handleFromAmountChange = (amount: string) => {
    setErrorMessage('');
    setFromAmount(amount);
    setInputSource('From');

    if (!amount || Number(amount) === 0) {
      setToAmount('');
      return;
    }

    getDebouncedQuote('From', amount);

    if (accountAddress && !checkBalance(amount)) {
      setErrorMessage('Insufficient balance');
      return;
    }
  };

  const handleToAmountChange = (amount: string) => {
    setErrorMessage('');
    setToAmount(amount);
    setInputSource('To');

    if (!amount || Number(amount) === 0) {
      setFromAmount('');
      return;
    }

    getDebouncedQuote('To', amount);

    if (accountAddress && fromAmount && !checkBalance(fromAmount)) {
      setErrorMessage('Insufficient balance');
      return;
    }
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

      {fromAmount && toAmount && !errorMessage && (
        <button onClick={handleActionClick} className={styles.swapButton}>
          {isApproved ? 'Swap' : 'Approve'}
        </button>
      )}
    </div>
  );
});

export default Form;
