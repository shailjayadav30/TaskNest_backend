import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./src/db/db.js";
import authRoute from "./src/route/authRoute.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api", authRoute);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    connectDb();
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
