const express = require("express");
const connect = require("./config/database");
const User = require("./models/user");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("HI BRO!"));
app.post("/signup", async (req, res) => {
    const doc = new User({
        firstName: "Yash",
        lastName: "kumar",
        emailId: "yash@bit.com",
        age: 12,
        password: "ABABSBSA",
        gender: "Male",
        _v: 1212
    });

    await doc.save();

    console.log("\n\n", doc);

    res.send("User created Successfully!!!");
});

connect()
    .then(() => {
        console.log("Connection Estab.");
        app.listen(PORT, () =>
            console.log("Server up and running on PORT: ", PORT)
        );
    })
    .catch(() => console.log("Connection Not Estab."));
