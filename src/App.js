import React, { useState } from "react";
import axois from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function App() {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);

  const options = {
    onUploadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      let precent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${precent}% `);
    },
  };

  const uploadImage = async (e) => {
    // const files = e.target.files[0];
    // setImage(files);
    const data = new FormData();
    data.append("upload_preset", "uploadImages");
    data.append("file", result);

    axois
      .post(
        "https://api.cloudinary.com/v1_1/dqmuowojl/image/upload",
        data,
        options
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }
  return (
    <div className="App">
      <h1> Upload image </h1>
      <input type="file" name="image" onChange={handleFileChange} />
      {src && (
        <div>
          <ReactCrop
            src={src}
            onImageLoaded={setImage}
            crop={crop}
            onChange={setCrop}
          />
          <button onClick={getCroppedImg}>Crop Image</button>
        </div>
      )}
      {result && (
        <div>
          <img src={result} alt="cropped image" />
        </div>
      )}
      <button onClick={uploadImage}>upload</button>
    </div>
  );
}

export default App;
