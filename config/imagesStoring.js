const { cloudinary } = require("./cloudinary");

const imagesStoring = async (images) => {
  try {
    const imagesPublicIds = [];
    await Promise.all(
      images.map(async (image) => {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          upload_preset: "assets",
        });
        imagesPublicIds.push(uploadedImage.public_id);
      })
    );
    return imagesPublicIds;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = imagesStoring;