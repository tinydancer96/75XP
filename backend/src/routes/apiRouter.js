const apiRouter = require("express").Router();
const achievementsRouter = require("./achievementsRouter");

apiRouter.get("/", (req, res) => {
  res.status(200).send({
    msg: "You are connected to the 75XP APi",
  });
});

apiRouter.use("/achievements", achievementsRouter);

module.exports = apiRouter;
