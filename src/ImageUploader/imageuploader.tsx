import React, { useState } from 'react';
import './imageUploader.css'
interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  className: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, className }) => {
  const [url, setUrl] = useState<string>('');
  const [imageSelected, setImageSelected] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUrl(reader.result);
        setImageSelected(true);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInput = () => {
    const customRealFile = document.getElementById('img_file') as HTMLInputElement;
    if (customRealFile) {
      customRealFile.click();
    }
  };

  const handleUpload = () => {
    if (url) {
      onImageUpload(url);
      setUrl('');
      setImageSelected(false);
    }
  };

  return (
    <div className="image_uploader">
      <input type="file" accept="image/*" onChange={handleImageChange} id="img_file" hidden />
      {!imageSelected && (
        <button onClick={handleInput} className="btn_upload ml-5">
          Add Image
        </button>
      )}
      {url && <img src={url} alt="Selected" style={{ height: '300px', width: '500px' }} />}
      {imageSelected && (
        <button onClick={handleUpload} className="btn_upload ">
          Upload Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
