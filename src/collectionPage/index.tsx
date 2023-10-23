import React from "react";
import { useSelector} from "react-redux";
import { Image } from "../collection/collectionSlice";
import { RootState } from "../collection/collectionSlice";
import "./collectionPage.css";
import Navbar from "../Navbar";
const CollectionPage: React.FC = () => {
  const collection = useSelector(
    (state: RootState) => state.collection.collection
  );

  return (
    <div>
      <Navbar />
      <h1 className="heading">Collection</h1>
      <p className="count">Total Images in Collection: {collection.length}</p>
      <ul className="collection">
        {collection.map((image: Image, index) => (
          <li key={index}>
            <div className="collection-items">
              <img src={image.url} alt={`Image ${index + 1}`} />
              <h4>Image {index + 1}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionPage;
