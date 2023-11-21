const express = require("express");
const router = express.Router();
const assetsController = require("../../controllers/assetsController");
const verifyRoles = require("../../middleware/verifyRoles");
const rolesList = require("../../config/rolesList");

router
  .route("/")
  .get(verifyRoles(rolesList.Broker), assetsController.getAllAssets);

router
  .route("/newasset")
  .get(verifyRoles(rolesList.Broker), assetsController.getAssetsEnum)
  .post(verifyRoles(rolesList.Broker), assetsController.createNewAsset);

router
  .route("/:code")
  .get(assetsController.getAsset)
  .put(assetsController.updateAsset)
  .delete(verifyRoles(rolesList.Manager), assetsController.deleteAsset);

module.exports = router;
