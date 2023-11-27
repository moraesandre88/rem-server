const jwt = require("jsonwebtoken");
const User = require("../model/User");
const rolesList = require("../config/rolesList");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  //Detected refresh token reuse
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) return res.sendStatus(403);
        const hackedUser = await User.findOne({
          username: decodedToken.username,
        }).exec();
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    );
    return res.sendStatus(403);
  }
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (item) => item !== refreshToken
  );
  //evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }
      if (err || foundUser.username !== decodedToken.username)
        return res.sendStatus(403);
      //Refresh token was still valid
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: decodedToken.username,
            userRoles: roles,
          },
          serverInfo: {
            serverRolesList: rolesList,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const newRefreshToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      //Saving refresh token with foundUser
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();
      //Create secure cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true, //Change to [false] when testing with Thunder Client
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
