// collectionActions.ts
import { Image } from '../reducers/collectionReducer'; 
export const addToCollection = (image: Image) => ({
  type: 'ADD_TO_COLLECTION' ,
  payload: image,
});

export default addToCollection ;
