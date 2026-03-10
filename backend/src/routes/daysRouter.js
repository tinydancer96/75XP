import express from "express";
import { getDayByUser } from "../controllers/daysController.js";

const daysRouter = express.Router();

daysRouter.get("/:profile_id/:day_number", getDayByUser);

export default daysRouter;
