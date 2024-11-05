const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";
const Listing = require("./models/listingSchema.js");
const path = require("path");
const methodOverride=require("method-override")
const ejsMate = require('ejs-mate');


// Database connection
const Dbconnect = async () => {
  await mongoose.connect(MONGO_URL);
};

Dbconnect()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
// console.log("Views directory:", path.join(__dirname, "views")); 
app.use(express.urlencoded({ extended: true }));// Add this line
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, "/public")));



// Test route
app.get("/working", (req, res) => {
  res.send("working perfectly");
});

// Listings route
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//creat Route
app.post("/listings", async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    next(err); // Corrected to 'next' instead of 'Next'
  }
});


 

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});


// Uncomment to test listing creation
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });
// 
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
app.use((err,req,res,next)=>{
  res.send("something went wrong")
})

app.listen(3000, () => {
  console.log("app listening on port 3000");
});

