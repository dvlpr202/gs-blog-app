//user model
const User = require("../../models/user-m")
//bcryptjs
const bcrypt = require("bcryptjs");
//jwt
const jwt = require("jsonwebtoken");
//register
const register = (req, res) => {
    const { name, username, email, password } = req.body;
    if( !name || !username || !email || !password ) {
        return res.status(400).json("all fields are required!");
    }
    User.findOne({ email: email })
    .then((existingUser) => {
        if ( existingUser ) {
            return res.status(401).json("email already exists!");
        }
        User.findOne({ username: username })
        .then((existingUsername) => {
            if ( existingUsername ) {
                return res.status(401).json("username already exists");
            }
            bcrypt.hash(password, 16)
        .then((hashedPass) => {
            const user = new User({
                name,
                username,
                email,
                password: hashedPass
            })
            user.save();
            res.status(202).json("user registered!");
        })
        .catch((err) => {
            res.status(500).json(err);
        })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    })
    .catch((err) => {
        res.status(500).json(err);
    })
}
//login
const login = (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
        return res.status(400).json("all fields are required!");
    }
    User.findOne({ email: email })
    .then((existingUser) => {
        if ( !existingUser ) {
            return res.status(401).json("invalid email or password!");
        }
        bcrypt.compare(password, existingUser.password)
        .then((doMatch) => {
            if (doMatch) {
                const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET )
                const { _id, name, username, email } = existingUser;
                return res.status(202).json({ token, user: { _id, name, username, email } })
            }
            else {
                return res.status(401).json("invalid email or password!");
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    })
    .catch((err) => {
        res.status(500).json(err);
    })
}

module.exports = { register, login };