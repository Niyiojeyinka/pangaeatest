const http = require("http");
const express = require("express");
const app = express();
const subscriber = require("./routes/subscriber");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); //process.env.DB_HOST
const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync with { force: true }");
});
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", subscriber);
app.set("port", process.env.S_PORT || 9000);
const server = http.createServer(app);
server.listen(process.env.S_PORT || 9000);
module.exports = app;
