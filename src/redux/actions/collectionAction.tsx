// collectionActions.ts
import { Image } from "../collection/collectionSlice";
export const addToCollection = (image: Image) => ({
  type: "ADD_TO_COLLECTION",
  payload: image,
});

export default addToCollection;
