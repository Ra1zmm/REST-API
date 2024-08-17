import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"
import user from "./models/user.js";
import bodyParser from "body-parser";



import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Configure the environment variables with .env
dotenv.config({ path: path.resolve(__dirname, 'config/.env') });
const MongoURL = process.env.MongoURL;
console.log(process.env.MongoURL);

//Lunch a server with express in the server.js file
const app = express();
app.use(bodyParser.json())


app.listen(5000, () => console.log("The server is Runing"));

//Connect your database locally or with mongo atlas
mongoose.connect(MongoURL).then(() => {
  console.log("Connected to Datebase");
});

app.get("/user", async (req, res) => {
  try {
    const info = await user.find();
    res.send(info);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/user", async (req, res) => {
  try {
    const info = await user.create(req.body);
    console.log("XXXXXXXXX")
    console.log(req.body)
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({ message:err.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const info = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const info = await user.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});
