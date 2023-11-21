const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const credentials = require("./middleware/credentials");
const logEvents = require("./middleware/logEvents");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3500;

require("dotenv").config();

//Connect to MongoDB
connectDB();

//Record logs
app.use(logEvents);

//Check for credentials before CORS and fetch cookies requirements
app.use(credentials);

//CORS
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//built-in middleware for json
app.use(express.json({limit: "50mb"}));

//built-in middleware for cookies
app.use(cookieParser());

//serer static files
app.use("/", express.static(path.join(__dirname, "/public"))); //"/" by default

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/assets", require("./routes/api/assets"));

//Custom error handler
app.use(errorHandler);

//Server running confirmation
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
