//Card Component
import React, { useState } from 'react';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { addToCollection } from '../collection/collectionSlice';
import { faTrash, faTag, faDownload, faPlus, faCircleXmark, faCogs } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
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

const Card: React.FC<CardProps> = ({ image, onDelete, onAddTag, onRemoveTag }) => {
  const { id, url, tags } = image;
  const [newTag, setNewTag] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({[id]:'large'});
  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (newTag) {
      onAddTag(id, newTag);
      setNewTag('');
      setShowInput(false);
    }
  };

  const handleDownload = () => {
    saveAs(url, `Cat${id}.jpg`);
  };

  const handleAddToCollection = () => {
    dispatch(addToCollection(image));
  };
  const cardSize = selectedSizes[id] || 'large';
  const handleConfig = (id: number, size: string) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [id]: size,
    }));
    setShowDropdown(false);
  };


  return (
    <div >
    <div
      className={`card ${isHovered ? 'group-hover' : ''} card-${cardSize}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={url} alt={`Cat ${id}`} className="card-img-top card_img" />

      {isHovered && (
        <div className="buttons_show">
          <button onClick={() => onDelete(id)} className="del_btn overlay_btn">
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
          <button className="add_collection overlay_btn" onClick={handleAddToCollection}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>
          <button className="download_btn overlay_btn" onClick={handleDownload}>
            <span>
              <FontAwesomeIcon icon={faDownload} />
            </span>
          </button>
          <div className="config-div">
            <div className={`config-dropdown ${showDropdown ? 'active' : ''}`}>
              <button className="config-btn" onClick={() => setShowDropdown(!showDropdown)}>
                <span>
                  <FontAwesomeIcon icon={faCogs} />
                </span>
              </button>

              <div className={`size-options ${showDropdown ? 'd-block' : 'd-none'}`}>
                <button onClick={() => handleConfig(id, 'small')}>Small</button>
                <button onClick={() => handleConfig(id, 'medium')}>Medium</button>
                <button onClick={() => handleConfig(id, 'large')}>Large</button>
              </div>
            </div>
          </div>
          <button onClick={() => setShowInput(!showInput)} className="mt-2 tag_btn">
            <span>
              <FontAwesomeIcon icon={faTag} />
            </span>
          </button>
          {showInput && (
            <div className="mb-2">
              <input
                type="text"
                placeholder="Add Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag();
                  }
                }}
                className="form-control add_tag"
              />
            </div>
          )}
</div>
 )}
          {tags && (
            <div className="tags mb-1">
              {tags.map((tag) => (
                <span key={tag} className="badge text-black">
                  {tag}
                  <button onClick={() => onRemoveTag(id, tag)} className="btn_remove">
                    <span>
                      <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#f7f7f7" }} />
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
