import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 4500;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

const url = process.env.MONGO_URI || "url";
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DBNAME;
const isTest = process.env.NODE_ENV === "test";
// Connect to MongoDB
mongoose
  .connect(url, {
    user,
    pass,
    dbName,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

//SAMPLE ROUTERS
app.use(routes);

if (!isTest) {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

export default app;
