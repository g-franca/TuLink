const express = require("express");
const {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento
} = require("../controllers/homeControllers");
const { formPerfil, editarFotoPerfil } = require("../controllers/perfilController");

const urlValidar = require("../middlewares/urlValida");
const verificaUser = require("../middlewares/verificarUser");

const router = express.Router();

router.get("/", verificaUser, leerUrls);
router.post("/", verificaUser, urlValidar, agregarUrl);
router.get("/eliminar/:_id", verificaUser, eliminarUrl);
router.get("/editar/:_id", verificaUser, editarUrlForm);
router.post("/editar/:_id", verificaUser, urlValidar, editarUrl);

router.get("/perfil", verificaUser, formPerfil);

router.get("/:shorUrl", redireccionamiento);

module.exports = router