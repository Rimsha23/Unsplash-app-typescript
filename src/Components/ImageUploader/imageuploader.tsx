// upload image from computer
import React, { useState } from "react";
import "./imageUploader.css";
interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  className: string;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  className,
}) => {
  const [url, setUrl] = useState<string>("");
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  //Logic for adding,selecting and reading image file url
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUrl(reader.result);
        setImageSelected(true);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //Logic for making custom add image button
  const handleInput = () => {
    const customRealFile = document.getElementById(
      "img_file"
    ) as HTMLInputElement;
    if (customRealFile) {
      customRealFile.click();
    }
  };
  //Logic for uploading the added image
  const handleUpload = () => {
    if (url) {
      onImageUpload(url);
      setUrl("");
      setImageSelected(false);
    }
  };

  return (
    <div className="image_uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="img_file"
        hidden
      />
      {/*Setting position of add image and upload image button on basis of whether image is selected or not  */}
      {!imageSelected && (
        <button onClick={handleInput} className="btn_upload ml-5">
          Add Image
        </button>
      )}
      {url && (
        <img
          src={url}
          alt="Selected"
          style={{ height: "300px", width: "500px" }}
        />
      )}
      {imageSelected && (
        <button onClick={handleUpload} className="btn_upload ">
          Upload Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
