//redux store
import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collection/collectionSlice';

const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});

export default store;
