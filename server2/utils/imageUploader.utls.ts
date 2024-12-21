import cloudinary from "./cloudinary.utils";

const uploadImage = async (file: Express.Multer.File) => {
  const based64Image = Buffer.from(file.buffer).toString("base64");
  /**
   * The buffer property holds the raw binary data of the uploaded file.
   * The toString("base64") method converts the binary data in the Buffer into a Base64-encoded string. Base64 encoding is used to represent binary data in an ASCII string format by translating it into a radix-64 representation. This is useful for data transmission in contexts where text data is more suitable, such as embedding images directly in HTML or JSON.
   */
  const dataURI = `data:${file.mimetype};base64,${based64Image}`;
  /**
   * This part embeds the mimetype property of the file object (which is provided by Multer when handling uploaded files). The mimetype indicates the type of the file, such as image/png, image/jpeg, etc. This ensures that the data URI is tagged with the correct MIME type for the file.
   *
   * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...
   */
  const uploadResponse = await cloudinary.uploader.upload(dataURI);
  return uploadResponse.secure_url;
  //   secure_url is a URL that points to the uploaded image hosted on Cloudinary's servers, using HTTPS. This is a secure link that can be used to display or access the image in web applications.
};

export default uploadImage;
