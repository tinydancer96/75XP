import express from "express";
import { getDay } from "../controllers/daysController";

const daysRouter = express.Router();

daysRouter.get("/dayId", getDay);

export default daysRouter;
