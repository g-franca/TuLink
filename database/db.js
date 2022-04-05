const mongoose = require('mongoose');
const { parseConnectionUrl } = require('nodemailer/lib/shared');
require("dotenv").config()

const clientDB = mongoose.connect(process.env.URI)
    .then((m) => {
        console.log("db conectada 🤯")
        return m.connection.getClient()
    })
    .catch(() => console.log("fallo la conexion. " + e));

module.exports = clientDB