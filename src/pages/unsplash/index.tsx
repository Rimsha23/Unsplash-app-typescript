//Main Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "@mui/lab/Masonry/Masonry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../Components/ImageUploader/imageuploader";
import Card from "../../Components/Card/card";
import "./unsplash.css";
import Navbar from "../../Components/Navbar";
interface Image {
  id: number;
  url: string;
  tags: string[];
}
const Unsplash: React.FC = () => {
  useEffect(() => {
    document.title = "Unsplash-Home";
  }, []);
  const [data, setData] = useState<Image[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  let count = 0;
  //Logic for uploading image
  const addImage = (imageUrl: string) => {
    const newImage: Image = {
      id: count + 1,
      url: imageUrl,
      tags: [],
    };

    setData([...data, newImage]);
  };
  //Logic for deleting images
  const deleteImage = (id: number) => {
    const updatedImages = data.filter((image) => image.id !== id);
    setData(updatedImages);
  };
  //Logic for adding tag
  const addTag = (id: number, tag: string) => {
    const updatedImages = data.map((image) => {
      if (image.id === id) {
        if (!image.tags) {
          image.tags = [];
        }
        if (!image.tags.includes(tag)) {
          image.tags.push(tag);
        }
      }
      return image;
    });
    setData(updatedImages);
  };
  //Logic for removing tags
  const removeTag = (id: number, tag: string) => {
    const updatedImages = data.map((image) => {
      if (image.id === id && image.tags) {
        image.tags = image.tags.filter((t) => t !== tag);
      }
      return image;
    });
    setData(updatedImages);
  };
  //Logic for fetching Images from API
  useEffect(() => {
    const apiUrl = "https://api.thecatapi.com/v1/images/search?limit=10";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data from the API: ${error.message}`);
        setIsLoading(false);
      });
  }, []);
  // Logic for searching images by tag
  const filterImagesByTag = () => {
    if (selectedTag === "") {
      return data;
    } else {
      const filteredImages = data.filter(
        (image) => image.tags && image.tags.includes(selectedTag)
      );

      return filteredImages;
    }
  };

  return (
    <div className="unsplash m-6">
      <Navbar />
      {/* First banner with searh field*/}
      <div className="banner1 container-fluid">
        <div className="search_container container">
          <h1 className="d1">Unsplash</h1>
          <p className="d1">
            The internet’s source for visuals.<br></br>Powered by creators
            everywhere.
          </p>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder=" Search high-resolution images"
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setData(filterImagesByTag());
                }
              }}
              className="search_form"
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search_icon" />
          </div>
        </div>
      </div>
      <div className="mb-4">
        {/*image card display*/}
        {isLoading && <h1>Loading....</h1>}

        <Masonry columns={{ xs: 1, sm: 2, md: 2, lg: 3 }} spacing={2}>
          {filterImagesByTag().map((catImage) => (
            <div className="grid-item" key={catImage.id}>
              <Card
                key={catImage.id}
                image={catImage}
                onDelete={deleteImage}
                onAddTag={addTag}
                onRemoveTag={removeTag}
              />
            </div>
          ))}
        </Masonry>
        <div className={`buttons_portion flex-row d-flex`}>
          <ImageUploader onImageUpload={addImage} className="image_uploader" />
        </div>
      </div>
    </div>
  );
};

export default Unsplash;
