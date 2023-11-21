const recordEvents = require("../config/recordEvents");

const logEvents = (req, res, next) => {
  recordEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  );
  next();
};

module.exports = logEvents;
