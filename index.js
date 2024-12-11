import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import models from "./db/model/index.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

models.dbconnect
  .sync()
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
