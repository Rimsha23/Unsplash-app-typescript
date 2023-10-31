//Card Component
import React, { useState } from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addToCollection } from "../../redux/collection/collectionSlice";
import {
  faTrash,
  faTag,
  faDownload,
  faPlus,
  faCircleXmark,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { Image } from "../../redux/collection/collectionSlice";
interface CardProps {
  image: {
    id: number;
    url: string;
    tags: string[];
  };
  onDelete: (id: number) => void;
  onAddTag: (id: number, tag: string) => void;
  onRemoveTag: (id: number, tag: string) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  onDelete,
  onAddTag,
  onRemoveTag,
}) => {
  const { id, url, tags } = image;
  const [newTag, setNewTag] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    { [id]: "large" }
  );
  const dispatch = useDispatch();
  //Logic for adding tags to images
  const handleAddTag = () => {
    if (newTag) {
      onAddTag(id, newTag);
      setNewTag("");
      setShowInput(false);
    }
  };
  //Logic for downloading the image
  const handleDownload = () => {
    saveAs(url, `Cat${id}.jpg`);
  };
  //Logic to add images to collection page using redux
  const handleAddToCollection = () => {
    const image: Image = {
      url,
    };
    dispatch(addToCollection(image));
  };
  //Logic for change size of images
  const cardSize = selectedSizes[id] || "large";
  const handleConfig = (id: number, size: string) => {
    setSelectedSizes({ [id]: size });
    setShowDropdown(false);
  };

  return (
    <div>
      <div
        //Adding group hover property on image card so that when it is hovered button appears and when mouse leave buttons disappear
        className={`card ${isHovered ? "group-hover" : ""} card-${cardSize}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={url} alt={`Cat ${id}`} className="card-img-top card_img" />
        {isHovered && (
          //Adding hovering effect od buttons
          <div className="buttons_show">
            <button
              onClick={() => onDelete(id)}
              className="del_btn overlay_btn"
            >
              <span>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
            <button
              className="add_collection overlay_btn"
              onClick={handleAddToCollection}
            >
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
            <button
              className="download_btn overlay_btn"
              onClick={handleDownload}
            >
              <span>
                <FontAwesomeIcon icon={faDownload} />
              </span>
            </button>
            <div className="config-div">
              <div
                className={`config-dropdown ${showDropdown ? "active" : ""}`}
              >
                <button
                  className="config-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>
                    <FontAwesomeIcon icon={faCogs} />
                  </span>
                </button>

                <div
                  className={`size-options ${
                    showDropdown ? "d-block" : "d-none"
                  }`}
                >
                  <button onClick={() => handleConfig(id, "small")}>
                    Small
                  </button>
                  <button onClick={() => handleConfig(id, "medium")}>
                    Medium
                  </button>
                  <button onClick={() => handleConfig(id, "large")}>
                    Large
                  </button>
                </div>
              </div>
            </div>
            {/*Adding onclick function to add tag button to show add tag input field*/}
            <button
              onClick={() => setShowInput(!showInput)}
              className="mt-2 tag_btn"
            >
              <span>
                <FontAwesomeIcon icon={faTag} />
              </span>
            </button>

            {showInput && (
              //Showing input field for adding tag on clicking add tag button
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Add Tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag();
                    }
                  }}
                  className="form-control add_tag"
                />
              </div>
            )}
          </div>
        )}
        {/* Making tag lists for images on addtion of tag */}
        {tags && (
          <div className="tags mb-1">
            {tags.map((tag) => (
              <span key={tag} className="badge text-black">
                {tag}
                {/*button for removing added tags from image*/}
                <button
                  onClick={() => onRemoveTag(id, tag)}
                  className="btn_remove"
                >
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ color: "#f7f7f7" }}
                    />
                  </span>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
