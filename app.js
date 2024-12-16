const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../MajorProject/models/listing.js")
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then( () =>{
    console.log("connected to DB.");
}).catch(err => {
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("Hi, I am root.")
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title : "My New Vila",
//         description : "By the beach",
//         price : 1300,
//         location : "Calangute, Goa",
//         country : "India"
//     });

//     await sampleListing.save()
//     console.log("sample saved");
//     res.send("Successful testing");
// })

app.listen(8080, () => {
    console.log("server is listening to port 8000");
});