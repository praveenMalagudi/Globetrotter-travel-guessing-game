import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// //routes import
// import userRouter from "";

// //routes declaration
// app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register


export { app };
