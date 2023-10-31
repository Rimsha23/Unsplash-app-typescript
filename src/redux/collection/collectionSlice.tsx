// collectionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Image {
  url: string;
}

export interface CollectionState {
  collection: Image[];
}
export type RootState = {
  collection: CollectionState;
};
const initialState: CollectionState = {
  collection: [],
};

const collectionReducer = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection: (state, action: PayloadAction<Image>) => {
      state.collection.push(action.payload);
    },
    removeFromCollection: (state, action: PayloadAction<number>) => {
      state.collection.splice(action.payload, 1);
    },
  },
});

export const { addToCollection, removeFromCollection } =
  collectionReducer.actions;

export default collectionReducer.reducer;
