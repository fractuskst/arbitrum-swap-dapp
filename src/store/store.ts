import { makeAutoObservable } from 'mobx';
import type { Asset, SourceType } from '../types';

class Store {
  fromAsset: Asset | null = null;
  toAsset: Asset | null = null;
  showFromModal = false;
  showToModal = false;
  fromAmount: string = '';
  toAmount: string = '';
  inputSource: SourceType | null = null;
  isApproved = false;

  constructor() {
    makeAutoObservable(this);
  }

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

  setApproved = (value: boolean) => {
    this.isApproved = value;
  };
}

export const store = new Store();
