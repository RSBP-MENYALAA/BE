import "./config/env";
import express from "express";
import cors from "cors";
import { predictRouter } from "./router/PredictRouter";
import { retrainRouter } from "./router/RetrainRoute";
import "./config/cron"
import { authRouter } from "./router/AuthRouter";
import { userRouter } from "./router/UserRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173", 
    ],
  })
);

app.use(express.json());

app.use("/api", predictRouter);
app.use("/api", retrainRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const port = Number(process.env.PORT_SERVER) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
