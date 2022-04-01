const express = require("express");
const {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento
} = require("../controllers/homeControllers");

const urlValidar = require("../middlewares/urlValida");
const verificaUser = require("../middlewares/verificarUser");

const router = express.Router();

router.get("/", verificaUser , leerUrls);
router.post("/", urlValidar, agregarUrl);
router.get("/eliminar/:_id", eliminarUrl);
router.get("/editar/:_id", editarUrlForm);
router.post("/editar/:_id", urlValidar, editarUrl);
router.get("/:shorUrl", redireccionamiento);

module.exports = router