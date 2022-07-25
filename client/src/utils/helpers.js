// Helper functions
import { uploadHotelImg } from "../services/firebaseSrv";
import { updateHotel } from "../services/netReq";

export const extractImageName = (path) => {
  let result = null;

  try {
    result = path.split("%2F")[2].split("?")[0];
  } catch (err) {
    result = null;
  }

  // if cant find filename - return original path
  return result || path;
};

export const createBlobImage = (image) => {
  return window.URL.createObjectURL(image);
};

export const uploadHotelImages = async (images, hotelId) => {
  try {
    await Promise.all(
      images.map((image) => uploadHotelImg(image, hotelId))
    ).then(async (imgUrls) => {
      await updateHotel(hotelId, { pictures: imgUrls });
      return imgUrls;
    });
  } catch (err) {
    throw err;
  }
};
