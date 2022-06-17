//mongoose
const mongoose = require("mongoose");
//model
const User = mongoose.model("User");
//jsonwebtoken
const jwt = require("jsonwebtoken");
//middleware
module.exports = ( req, res, next ) => {
    const { authorization } = req.headers;
    if ( !authorization ) {
        return res.status(401).json("you must be logged in!");
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if ( err ) {
            return res.status(401).json("you must be logged in!");
        }
        const { _id } = payload;
        User.findById( _id )
        .then((data) => {
            req.user = data;
            next();
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    })
}