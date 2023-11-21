const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
    if (error) return res.sendStatus(403);
    req.username = decodedToken.userInfo.username;
    req.roles = decodedToken.userInfo.userRoles;
    next();
  });
};

module.exports = verifyJWT;
