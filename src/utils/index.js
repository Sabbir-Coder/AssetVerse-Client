import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const {data} = await axios.post(
    `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_imgbb_Api_Key}`,
    formData
  );

  const imgURL = data?.data?.display_url;
  return imgURL;
};


// save and update user in db
export const saveOrUpdateUser = async (userData) => {
  const {data} = await axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    userData
  );
  return data;
};