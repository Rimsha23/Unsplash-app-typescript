// store.tsx

import { createStore, combineReducers } from 'redux';
import collectionReducer, {CollectionState } from './reducers/collectionReducer';

// Create the rootReducer by combining your reducers
const rootReducer = combineReducers({
  collection: collectionReducer,
});

// Define the root state type
export interface RootState {
  collection: CollectionState;
}

// Create the store with rootReducer and any middleware you might need
const store = createStore(rootReducer);

// Export the store
export default store;

