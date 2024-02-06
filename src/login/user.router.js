import express from "express";
import {login, sigin} from "./user.controller.js";
const router = express.Router();
router.post("/", login);
router.post("/add_user", sigin);

export default router;
