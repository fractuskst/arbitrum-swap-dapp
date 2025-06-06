import styles from './Form.module.css';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/StoreContext';
import SwapInputSection from '../SwapInputSection/SwapInputSection';
import { useSwapQuoteFetcher } from '@/utils/useSwapQuoteFetcher';
import { useBalanceCheck } from '@/utils/useBalanceCheck';
import { useAllowanceCheck } from '@/utils/useAllowanceCheck';
import { useTokenApproval } from '@/utils/useTokenApproval';
import { useSwapExecution } from '@/utils/useSwapExecution';
import { getButtonText } from '@/utils/getButtonText';

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
    isLoading,
    setIsLoading,
    setSwapResult,
  } = useStore();

  const { checkBalance } = useBalanceCheck();
  const { checkAllowance } = useAllowanceCheck();
  const { approveToken } = useTokenApproval();
  const { executeSwap } = useSwapExecution();
  const getDebouncedQuote = useSwapQuoteFetcher();

  const handleSwapClick = async () => {
    if (!accountAddress || !spenderAddress || !fromAsset || !fromAmount) return;
    setIsLoading(true);

    try {
      if (fromAsset.isNative) {
        await executeSwap(spenderAddress, fromAsset, fromAmount);
        setSwapResult('Success');
        return;
      }

      const hasEnoughAllowance = await checkAllowance(
        accountAddress,
        spenderAddress,
        fromAsset.address,
        fromAmount,
        fromAsset.decimals,
      );

      if (!hasEnoughAllowance) {
        await approveToken(fromAsset.address, spenderAddress, fromAmount, fromAsset.decimals);
        setIsApproved(true);
      }

      await executeSwap(spenderAddress, fromAsset, fromAmount);
      setSwapResult('Success');
    } catch (error) {
      setSwapResult('Failed');
      setErrorMessage(error instanceof Error ? error.message : 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
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
        <button onClick={handleSwapClick} disabled={isLoading} className={styles.swapButton}>
          {getButtonText(isLoading, isApproved)}
        </button>
      )}
    </div>
  );
});

export default Form;
