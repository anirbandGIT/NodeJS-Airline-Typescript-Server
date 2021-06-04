import App from "./app";
import "dotenv/config";
import validateEnv from "./utils/validateEnv";

// import * as mongoose from "mongoose";
// const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
validateEnv();

// controllers
import AirlinesController from "./controllers/airlines/airline.controller";

const app = new App([new AirlinesController()], 5000); // see constructor of App

app.listen(); // this.app.listen(this.port)
