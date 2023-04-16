const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routers/authRouter");
const petsRoutes = require("./routers/petsRouter");
const favoritesRoutes = require("./routers/favoritesRouter");

const mongo = config.get("mongo");
const app = express();
app.use(morgan("tiny"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/pets", petsRoutes);
app.use("/favorites", favoritesRoutes);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.set("strictQuery", false);

(async function () {
  mongoose.connect(mongo.url);
})().catch((err) => console.log(err));

module.exports = app;
