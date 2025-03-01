import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// //routes import
import userRouter from "./routes/user.routes.js";
import datasetRouter from "./routes/dataset.routes.js";
import inviteRouter from "./routes/invite.routes.js";

// //routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/datasets", datasetRouter);
app.use("/api/v1/invites", inviteRouter);

export { app };
