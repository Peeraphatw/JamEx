const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));
app.use("/js", express.static(__dirname + "client/js"));
const colors = require("colors");
const detenv = require("dotenv");
const memberRouter = require("./routers/memberRouter");
const connectionDB = require("./config/db");
detenv.config({ path: "./config/config.env" });
connectionDB();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});
app.use("/member", memberRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  console.log(process.env.NODE_ENV);
});

console.log(process.env);
