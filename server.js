import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./models/user.js";

//Configure the environment variables with .env
dotenv.config();
const MongoURL = process.env.MongoURL;
console.log(process.env.MongoURL);

//Lunch a server with express in the server.js file
const app = express();

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
    const info = new user(req.body);
    await info.save();
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
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
