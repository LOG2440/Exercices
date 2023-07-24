const express = require("express");
const cors = require("cors");
const courseRouter = require("./courseRouter");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/cours", courseRouter.router);

app.listen(port);