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
  const collectionReducer = (state: CollectionState = initialState, action: any) => {
    if (action.type === 'ADD_TO_COLLECTION') {
      return {
        ...state,
        collection: [...state.collection, action.payload],
      };
    }
    return state;
  };
  
  export default collectionReducer;
  