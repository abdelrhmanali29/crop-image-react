import React, { useEffect, useState, useContext } from "react";
import axois from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import fire from "./fire";
import { UserContext }  from "./App"

function Profile() {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);
  const [myImages, setMyImages] = useState(null);
  const db = fire.firestore();
  const images = []
  const { user } = useContext(UserContext); 



  useEffect(() => {
    db.collection("images").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        images.push(doc.data().imageUrl);
      })
      // console.log(images)
    })
  })




  const options = {
    onUploadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      let precent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${precent}% `);
    },
  };



  const uploadImage = async (e) => {
    if (!user) {
      alert("You should login!");
      return
    }
    alert(user.displayName)
    // const files = e.target.files[0];
    // setImage(files);
    const data = new FormData();
    data.append("upload_preset", "uploadImages");
    data.append("file", result);
    data.append("user_name", user.displayName );
    console.log(user.displayName)

    axois
      .post(
        "https://api.cloudinary.com/v1_1/dqmuowojl/image/upload",
        data,
        options,
      )
      .then((res) => {
        console.log(res)
        console.log(res.data.secure_url);;
        db.collection("images").add({
          imageUrl: (res.data.secure_url)
        })
      })
      .catch((err) => console.log(err));
    setResult(null);
    // setImage(null);
  };

  const handleFileChange = (e) => {
    if (!user) {
      alert("You should login!");
      return;
    }
      setSrc(URL.createObjectURL(e.target.files[0]));
  };


  
  function getCroppedImg() {
    if (!user) {
      alert("You should login!");
      return;
    }
    alert(user.displayName)
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  
  function onUpload(e) {
    if (!user) {
      alert("You should login!")
        e.preventDefault()
      return
    } else {
      
    }
  }

  return (
      <div>
        <h1> Upload image </h1>
        <input type="file" name="image" onChange={handleFileChange} onClick={onUpload} />
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
            <img src={result} alt="croppedImg" />
          </div>
        )}
        <button onClick={uploadImage}>upload</button>
        <label>My images</label>
      </div>
  );
}

export default Profile;
