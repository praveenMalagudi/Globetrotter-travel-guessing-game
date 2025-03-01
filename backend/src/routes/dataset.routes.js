import express from "express";
import {
  checkQuizAnswer,
  getDataset,
} from "../controllers/dataset.controller.js";
// Import additional controller functions

const router = express.Router();

// Add the route for getting a single dataset
router.get("/:userId", getDataset); // Route to get a dataset by ID
router.post("/check-quiz-answer", checkQuizAnswer);
export default router;
