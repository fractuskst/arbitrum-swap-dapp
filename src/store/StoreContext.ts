import React from 'react';
import { store } from './store';

export const StoreContext = React.createContext(store);

export const useStore = () => React.useContext(StoreContext);
