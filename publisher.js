const http = require("http");
const express = require("express");
const app = express();
const publisher = require("./routes/publisher");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync with { force: true }");
});
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", publisher);
app.set("port", process.env.P_PORT || 8000);
const server = http.createServer(app);
server.listen(process.env.P_PORT || 8000);
module.exports = app;
