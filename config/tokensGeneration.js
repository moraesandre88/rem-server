const crypto = require("crypto");
const fsPromises = require("fs").promises;
const path = require("path");
const readEnv = require("./readEnv");

const tokensGeneration = async () => {
  try {
    const envContent = await readEnv();
    const accessTokenSecret = crypto.randomBytes(64).toString("hex");
    const refreshTokenSecret = crypto.randomBytes(64).toString("hex");
    const newEnvContent = `${envContent}\nACCESS_TOKEN_SECRET=${accessTokenSecret}\nREFRESH_TOKEN_SECRET=${refreshTokenSecret}\n`;
    await fsPromises.writeFile(
      path.join(__dirname, "..", ".env"),
      newEnvContent
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = tokensGeneration;
