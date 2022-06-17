//express
const express = require("express");
const app = express();
//cors
const cors = require("cors");
app.use(cors());
//bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`you're connected to PORT:${PORT}`);
})
require("dotenv/config");
//mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("connected to atlas db!");
})
//for build
if ( process.env.NODE_ENV == "production" ) {
    app.use(express.static("client/build"))
}
//routes
const Routes = require("./routes/allroutes");
app.use("/", Routes);