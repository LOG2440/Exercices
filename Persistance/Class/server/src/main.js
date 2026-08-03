const express = require("express");
const cors = require("cors");
const courseRouter = require("./courseRouter");
const profRouter = require("./profRouter");
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/cours", courseRouter.router);
app.use("/prof", profRouter.router);

app.listen(port, () => { console.log(`Serveur disponible sur port ${port}`) });