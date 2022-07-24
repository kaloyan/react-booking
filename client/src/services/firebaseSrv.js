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

const delImage = async (imgRef) => {
  try {
    await deleteObject(imgRef);
    return true;
  } catch (err) {
    throw err;
  }
};

export const uploadAvatar = (avatar) => {
  return uploadImage(avatar, "img/avatars");
};

export const delAvatar = async (avatar) => {
  try {
    const delRef = ref(storage, `img/avatars/${avatar}`);
    await delImage(delRef);
  } catch (err) {
    // console.log(err);
  }
  return "Image deleted";
};

export const uploadDest = (image) => {
  const folder = "img/destinations";
  return uploadImage(image, folder);
};

export const uploadHotelImg = (image) => {
  const folder = "img/hotels";
  return uploadImage(image, folder);
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
