const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middle Ware

app.use(cors());
app.use(express.json);

app.get("/", (req, res) => {
  res.send("connected learning server is running.....");
});
app.listen(port, () => {
  console.log(`connected learning server is running on PORT ${port}`);
});
