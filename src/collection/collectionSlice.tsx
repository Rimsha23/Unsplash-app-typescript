//Collection splice for collection page
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Image {
  url: string;

}

export interface CollectionState {
  collection: Image[];

}

const initialState: CollectionState = {
  collection: [],
};
export type RootState = {
   collection: CollectionState;
   };
const collectionReducer = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addToCollection: (state, action: PayloadAction<Image>) => {
      state.collection.push(action.payload);
    },
  },
});

export const { addToCollection } = collectionReducer.actions;

export default collectionReducer.reducer;
