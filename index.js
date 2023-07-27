// @ts-nocheck
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const route = require("./src/routes/ecomm_routes");
require("./src/db/db");

const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

app.use(route);
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`App running on port:: 🎉 ${PORT}`);
});
