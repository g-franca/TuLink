const mongoose = require('mongoose');

mongoose.connect(process.env.URI)
    .then(() => console.log("db conectada 🤯"))
    .catch(() => console.log("fallo la conexion. " + e));