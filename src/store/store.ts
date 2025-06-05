import { makeAutoObservable } from 'mobx';
import type { Asset, SourceType } from '../types';
import { squid } from '@/configs';

class Store {
  accountAddress: string | null = null;
  spenderAddress: string | null = null;
  inputSource: SourceType | null = null;
  fromAsset: Asset | null = null;
  toAsset: Asset | null = null;
  showFromModal = false;
  showToModal = false;
  fromAmount = '';
  toAmount = '';
  isApproved = false;
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
    this.initSquid();
  }

  async initSquid() {
    try {
      await squid.init();
    } catch (e) {
      console.error('Squid init error:', e);
    }
  }

  setAccountAddress = (address: string) => {
    this.accountAddress = address;
  };

  setSpenderAddress = (address: string) => {
    this.spenderAddress = address;
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
  };

  setToAmount = (value: string) => {
    this.toAmount = value;
  };

  setIsApproved = (value: boolean) => {
    this.isApproved = value;
  };

  setErrorMessage = (message: string) => {
    this.errorMessage = message;
  };

  setInputSource = (value: SourceType) => {
    this.inputSource = value;
  };
}

export const store = new Store();
