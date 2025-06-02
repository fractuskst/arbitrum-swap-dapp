import { makeAutoObservable } from 'mobx';
import type { Asset, SourceType } from '../types';

class Store {
  accountAddress = '';
  fromAsset: Asset | null = null;
  toAsset: Asset | null = null;
  showFromModal = false;
  showToModal = false;
  fromAmount: string = '';
  toAmount: string = '';
  inputSource: SourceType | null = null;
  isApproved = false;
  errorMessage: string = '';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAccountAddress = (address: string) => {
    this.accountAddress = address;
  };

  setFromAsset = (asset: Asset | null) => {
    this.fromAsset = asset;
  };

  setToAsset = (asset: Asset | null) => {
    this.toAsset = asset;
  };

  setShowFromModal = (value: boolean) => {
    this.showFromModal = value;
  };

  setShowToModal = (value: boolean) => {
    this.showToModal = value;
  };

  setFromAmount = (value: string) => {
    this.fromAmount = value;
    this.inputSource = 'From';
  };

  setToAmount = (value: string) => {
    this.toAmount = value;
    this.inputSource = 'To';
  };

  setIsApproved = (value: boolean) => {
    this.isApproved = value;
  };

  setErrorMessage = (message: string) => {
    this.errorMessage = message;
  };

  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };
}

export const store = new Store();
