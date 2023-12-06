const createHttpError = require("http-errors");
const Asset = require("../model/Asset");
const fields = require("../model/fields/fields");
const imagesStoring = require("../config/imagesStoring");
const deleteImages = require("../config/deleteImages");
const codeGeneration = require("../config/codeGeneration");

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find();
    if (assets.length === 0) {
      res.sendStatus(204);
    } else {
      const filteredAssets = assets.map((asset) => ({
        images: asset.images,
        type: asset.type,
        neighborhood: asset.address.neighborhood,
        state: asset.address.state,
        size: asset.size,
        bedrooms: asset.rooms.bedrooms,
        bathrooms: asset.rooms.bathrooms,
        parkingSpaces: asset.rooms.parkingSpaces,
        selling: asset.status.selling,
        rental: asset.status.rental,
        sellingPrice: asset.values.sellingPrice,
        rentalPrice: asset.values.rentalPrice,
        monthlyCondominium: asset.values.monthlyCondominium,
        published: asset.published,
        code: asset.code,
      }));
      res.status(200).json(filteredAssets);
    }
  } catch (error) {
    next(error);
  }
};

const getAssetsEnum = async (req, res, next) => {
  try {
    const enumValues = await Asset.schema.path("type").enumValues;
    if (enumValues.length === 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json(enumValues.sort());
    }
  } catch (error) {
    next(error);
  }
};

const createNewAsset = async (req, res, next) => {
  try {
    const {
      address,
      size,
      type,
      rooms,
      extra,
      services,
      security,
      status,
      values,
      owners,
      images,
      description,
      username,
    } = req.body;

    //Check for inconsistences at the required fields
    if (
      !address.street ||
      !address.number ||
      !address.neighborhood ||
      !address.city ||
      !address.state ||
      !owners ||
      !size ||
      !type ||
      !description
    ) {
      throw createHttpError(400, "Dados incompletos.");
    }

    //Search for duplicates
    const duplicatedAsset = await Asset.findOne({
      $and: [
        { "address.street": address.street },
        { "address.number": address.number },
        { "address.complement": address?.complement },
        { "address.neighborhood": address.neighborhood },
        { "address.city": address.city },
        { "address.state": address.state },
      ],
    }).exec();
    if (duplicatedAsset) {
      throw createHttpError(409, "Imóvel já cadastrado");
    }

    //Creating code for register
    const typeCount = await Asset.countDocuments({ type });
    const code = codeGeneration(type, typeCount);

    //Storing images in Cloudinary and saving urls
    const imagesPublicIds = await imagesStoring(images);
    if (!code || !imagesPublicIds) {
      throw createHttpError(500, "Erro no cadastro do imóvel");
    }

    //Creating document and sending response
    const newAsset = await Asset.create({
      address,
      size,
      type,
      rooms,
      extra,
      services,
      security,
      status,
      values,
      owners,
      images: imagesPublicIds,
      description,
      username,
      code,
      published: false,
    });

    //Deleting images from Cloudinary in case of error during new asset's creation
    if (!newAsset) {
      await deleteImages(imagesPublicIds);
      throw createHttpError(500, "Erro no cadastro do imóvel");
    }

    res.status(201).json({ message: "Imóvel criado com sucesso!" });
    console.log(newAsset);
  } catch (error) {
    next(error);
  }
};

const getAsset = async (req, res, next) => {
  try {
    const code = req.params.code;
    const asset = await Asset.findOne({ code }).exec();
    if (!asset) {
      res.sendStatus(204);
    } else {
      res.status(200).json(asset);
    }
  } catch (error) {
    next(error);
  }
};

const updateAsset = async (req, res) => {
  const assetData = req.body;
  //Check for inconsistences at the required fields
  if (
    !fields.requiredAddressFields.every((field) => assetData.address[field]) ||
    !fields.requiredOwnersFields.every((field) => assetData.owners[field]) ||
    !assetData.size ||
    !assetData.type ||
    !assetData.description
  )
    return res.sendStatus(400);
  try {
    //Search for duplicates
    const duplicatedAsset = await Asset.findOne({
      $and: [
        { "address.street": assetData.address?.street },
        { "address.number": assetData.address?.number },
        { "address.complement": assetData.address?.complement },
        { "address.neighborhood": assetData.address?.neighborhood },
        { "address.city": assetData.address?.city },
        { "address.state": assetData.address?.state },
      ],
    }).exec();
    if (duplicatedAsset && duplicatedAsset._id != req.params.id)
      return res.sendStatus(409);
    //Treating possibles undefined fields
    assetData.address.complement = assetData.address.complement ?? "";
    fields.nonRequiredRoomsFields.forEach((field) => {
      assetData.rooms[field] = assetData.rooms[field] ?? 0;
    });
    fields.nonRequiredValuesFields.forEach((field) => {
      assetData.values[field] = assetData.values[field] ?? 0;
    });
    assetData.pictures.pictureName = assetData.pictures.pictureName ?? "";
    assetData.pictures.pictureData =
      assetData.pictures.pictureData ?? Buffer.alloc(0);
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      assetData,
      { new: true }
    );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    const code = req.params.code;

    //Check if the asset is not already deleted from db (just in case)
    const asset = await Asset.findOne({ code }).exec();
    if (!asset) return res.sendStatus(204);

    //Delet asset from db
    await asset.deleteOne({ code });
    res.status(204).json({message: "Imóvel deletado"});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAssets,
  getAssetsEnum,
  createNewAsset,
  getAsset,
  updateAsset,
  deleteAsset,
};
