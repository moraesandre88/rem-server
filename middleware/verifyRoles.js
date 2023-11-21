const createHttpError = require("http-errors");

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) throw createHttpError(401, "Acesso não autorizado!");

    const rolesArray = [...allowedRoles];
    const found = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);
    if (!found) throw createHttpError(401, "Acesso não autorizado!");
    next();
  };
};

module.exports = verifyRoles;
