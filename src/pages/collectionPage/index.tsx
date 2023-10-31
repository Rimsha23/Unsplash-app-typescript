// CollectionPage.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "../../redux/collection/collectionSlice";
import { RootState } from "../../redux/collection/collectionSlice";
import "./collectionPage.css";
import Navbar from "../../Components/Navbar";
import { removeFromCollection } from "../../redux/collection/collectionSlice";
const CollectionPage: React.FC = () => {
  const dispatch = useDispatch();
  //Updating the title of page
  useEffect(() => {
    document.title = "Unsplash-Collection";
  }, []);
  //Selecting and calling the state of collection from redux
  const collection = useSelector(
    (state: RootState) => state.collection.collection
  );
  //logic for removing image from collection
  const handleRemoveImage = (index: number) => {
    dispatch(removeFromCollection(index));
  };

  return (
    <div>
      <Navbar />
      <h1 className="heading">Collection</h1>
      <p className="count">Total Images in Collection: {collection.length}</p>
      <div className="collection">
        {collection.map((image: Image, index) => (
          <div className="collection-items" key={index}>
            <img src={image.url} alt={`Image ${index + 1}`} />
            <div className="row">
              <h4>Image {index + 1}</h4>
              <button className="rem_btn" onClick={() => handleRemoveImage(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default CollectionPage;
