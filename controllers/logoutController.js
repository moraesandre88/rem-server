const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  //Check if refreshToken is in db
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None", 
      secure: true,
    });
    return res.sendStatus(204);
  }

  //Delete refreshToken from db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (item) => item !== refreshToken
  );
  await foundUser.save();
  
  //Delete cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
