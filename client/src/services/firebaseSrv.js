// Firebase service for file storage

import { storage } from "../config/firebaseCfg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  return uploadImage(image, "img/destinations");
};
