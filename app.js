const express = require("express");
const PORT = 3232;
require("dotenv").config();

const cors = require("cors");
//app init
const app = express();

//database
const mongoose = require("mongoose");
// connect to databse
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect("mongodb://localhost:27017/orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//use middelwares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("./app/routes/uploads"));

//order routes
const orderRoutes = require("./app/routes/order.routes");
const userRoutes = require("./app/routes/user.routes.js");
const garmentRoutes = require("./app/routes/garment.routes.js");
const StyleOptionRoutes = require("./app/routes/StyleOptions.routes.js");
const OptionRoutes = require("./app/routes/Options.routes.js");
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", garmentRoutes);
app.use("/api", StyleOptionRoutes);
app.use("/api", OptionRoutes);

//app listen
app.listen(PORT, () => {
  console.log("server started.");
});
