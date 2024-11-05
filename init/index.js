// const express = require("express");
// const mongoose = require("mongoose");
// const Listing = require("../models/listingSchema.js");
// const initdata = require("./data.js");

// const app = express();
// const MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";

// const Dbconnect = async () => {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("Database connected in index.js");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     process.exit(1); // Exit process with failure
//   }
// };

// const initDb = async () => {
//   try {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initdata.data);
//     console.log("Data was initialized");
//   } catch (error) {
//     console.error("Error initializing data:", error);
//   }
// };

// // Run the connection and data initialization
// const run = async () => {
//   await Dbconnect();
//   await initDb();
// };

// run();
