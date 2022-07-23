// Firebase service for file storage

import { storage } from "../config/firebaseCfg";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { uuidv4 } from "@firebase/util";

const uploadImage = async (image, folder) => {
  const fName = uuidv4();
  const imageRef = ref(storage, `${folder}/${fName}`);

  const response = await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(response.ref);

  return imageUrl;
};

export const uploadAvatar = (avatar) => {
  return uploadImage(avatar, "img/avatars");
};

export const uploadDest = (image) => {
  const folder = "img/destinations";
  return uploadImage(image, folder);
};

export const uploadHotelImg = (image) => {
  const folder = "img/hotels";
  return uploadImage(image, folder);
};

const delImage = async (imgRef) => {
  try {
    await deleteObject(imgRef);
    return true;
  } catch (err) {
    throw err;
  }
};

export const delDestinationImg = async (imgName) => {
  const delRef = ref(storage, `img/destinations/${imgName}`);
  await delImage(delRef);
  return "Image deleted";
};

export const delHotelImage = async (imgName) => {
  try {
    const delRef = ref(storage, `img/hotels/${imgName}`);
    await delImage(delRef);
  } catch (err) {
    // console.log(err);
  }
  return "Image deleted";
};
