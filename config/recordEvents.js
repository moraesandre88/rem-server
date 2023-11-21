const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const recordEvents = async (message, eventName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const recordedInfo = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "events"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "events"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "events", eventName),
      recordedInfo
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = recordEvents;
