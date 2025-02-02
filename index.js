const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const mainroutes = require("./routes/mainroutes");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");



app.use(cors()); // Enable CORS
app.use(express.json()); // For JSON request bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use("/", mainroutes);
app.set('view engine', 'ejs');
app.use(express.static('public'));




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
