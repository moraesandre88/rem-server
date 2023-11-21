const { cloudinary } = require("./cloudinary");

const deleteImages = async (imagesPublicIds) => {
  try {
    await Promise.all(
      imagesPublicIds.map(async (publicId) => {
        await cloudinary.uploader.destroy(publicId);
      })
    );
    console.log("Imagens deletadas com sucesso");
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteImages;
