const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const fsPromises = require("fs").promises;
const path = require("path");
const User = require("../model/User");

const handleNewUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Check for required fields
    if (!username || !password) throw createHttpError(400, "Dados pendentes");

    //Check for duplicated User
    const duplicatedUser = await User.findOne({
      username,
    }).exec();
    if (duplicatedUser) throw createHttpError(409, "Nome já utilizado");

    //Check documents's count in database
    const documentsCount = await User.countDocuments();

    //Logic for .env file and tokens creation if first user
    if (documentsCount == 0) {
      const accessTokenSecret = crypto.randomBytes(64).toString("hex");
      const refreshTokenSecret = crypto.randomBytes(64).toString("hex");
      await fsPromises.writeFile(
        path.join(__dirname, "..", ".env"),
        `ACCESS_TOKEN_SECRET=${accessTokenSecret}\nREFRESH_TOKEN_SECRET=${refreshTokenSecret}\n`
      );
    }

    //Create User
    const hashedPwd = await bcrypt.hash(password, 11);
    await User.create({
      username,
      roles: documentsCount == 0 ? { Manager: "manager01" } : {},
      password: hashedPwd,
    });
    res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleNewUser };
