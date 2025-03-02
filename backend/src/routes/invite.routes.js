import express from "express";
import { inviteFriend } from "../controllers/invite.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/invite-friend", verifyJWT, inviteFriend); // Secured route for inviting friends

export default router;
