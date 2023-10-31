// store.tsx

 import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './redux/collection/collectionSlice';

const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});

export default store;

