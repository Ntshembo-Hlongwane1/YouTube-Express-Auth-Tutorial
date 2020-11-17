import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/AuthRoute/Auth";
dotenv.config();
const app = express();

//===========================================MongoDB Connection & Configs===============================================
const mongoURI = process.env.mongoURI;
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("Connection to MongoDB was successful");
  }
);

//====================================================Endpoints========================================================
app.use(authRoute);

//===========================================Server Configs=============================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
