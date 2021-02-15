const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send(JSON.stringify("This is default route."));
});

app.post("/register", (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;


    mongoose.connect('mongodb://localhost:27017/mernDB', { useNewUrlParser: true, useUnifiedTopology: true });

    var models = mongoose.connection.models;

    var schema = mongoose.Schema({
        id: Number,
        fullName: String,
        email: String,
        password: String
    })


    var mstr_user;

    if (!models.mstr_users) {
        mstr_user = mongoose.model("mstr_users", schema);
    } else {
        mstr_user = models.mstr_users;
    }


    var newUser = new mstr_user({
        id: 10,
        fullName: fullName,
        email: email,
        password: password
    });

    mstr_user.find({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
        } else if (user.length > 0) {
            res.send(JSON.stringify("Email already exists!"));
        } else {
            newUser.save().then(() => res.send(JSON.stringify("User registered successfully!")));
        }
    });

});


app.listen(5000, () => {
    console.log("Server started at 5000!");
});