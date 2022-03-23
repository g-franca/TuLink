const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const urls = [
        {origin: "google.com/bluuweb1", shortURL: "Blueweb1"},
        {origin: "google.com/bluuweb2", shortURL: "Blueweb2"},
        {origin: "google.com/bluuweb3", shortURL: "Blueweb3"},
    ]
    res.render('home', {urls: urls})
})



module.exports = router