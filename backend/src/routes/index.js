import express from "express";
import daysRouter from "./daysRouter.js";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({
    msg: "You are connected to the 75XP APi",
  });
});

apiRouter.use("/days", daysRouter);

export default apiRouter;
