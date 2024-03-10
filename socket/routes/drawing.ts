import express from "express";
import {
  createWhiteboard,
  getWhiteBoard,
  getWhiteBoards,
  updateBoard,
} from "../controllers/drawing";

const router = express.Router();

router.route("/").get(getWhiteBoards).post(createWhiteboard);
router.route("/:id").get(getWhiteBoard).put(updateBoard);

export default router;
