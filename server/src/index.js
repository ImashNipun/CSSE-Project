import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import apiRouter from "./api";
import config from "./config";
import { authenticator, errorHandler } from "./middleware";

const  isTesting = config.NODE_ENV === 'test';

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }) 
);
//app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.set("trust proxy", 1);


if(!isTesting){
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
  });
  
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully!");
  });
  
  mongoose.connection.on("error", (error) => {
    console.log(`Error massage: ${error.message}-----`, error);
  });
}

//app.use(authenticator)

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});