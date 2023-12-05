const fsPromises = require("fs").promises;
const path = require("path");

const readEnv = async () => {
  try {
    const files = await fsPromises.readFile(
      path.join(__dirname, "..", ".env"),
      "utf-8"
    );
    return files;
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports = readEnv;
