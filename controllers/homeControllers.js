const Url = require("../models/Url")

const leerUrls = async (req, res) => {
    try {
        const urls = await Url.find({user: req.user.id}).lean()
        res.render('home', { urls: urls })
    } catch (error) {
        // console.log(error)
        // res.send("fallo algo")
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
};

const agregarUrl = async (req, res) => {

    const { origin } = req.body;
    const shortUrlId = Math.random().toString(16).slice(2);

    try {
        const url = new Url({origin: origin, shortURL: shortUrlId, user: req.user.id});
        await url.save();
        req.flash("mensajes", [{ msg: "Url agregada" }]);
        res.redirect("/");
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
};

const eliminarUrl = async (req, res) => {
    const { _id } = req.params;
    try {
        // await Url.findByIdAndDelete(_id)
        const url = await Url.findById(_id)
        if (!url.user.equals(req.user.id)) {
            throw new Error("No es su url.")
        }
        await url.remove();
        req.flash("mensajes", [{msg: "Url eliminada"}]);
        res.redirect("/");
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
}

const editarUrlForm = async (req, res) => {
    const { _id } = req.params;
    try {
        const url = await Url.findById(_id).lean();

        if (!url.user.equals(req.user.id)) {
            throw new Error("No es su url.")
        }

        return res.render("home", {url});
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
}

const editarUrl = async (req, res) => {
    const { _id } = req.params;
    const { origin } = req.body;
    try {
        const url = await Url.findById(_id);
        if (!url.user.equals(req.user.id)) {
            throw new Error("No es su url.")
        }

        await url.updateOne({ origin });
        req.flash("mensajes", [{msg: "Url editada"}]);

        res.redirect("/");
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
}

const redireccionamiento = async (req, res) => {
    const { shorUrl } = req.params;
    try {
        const urlDB = await Url.findOne({ shortURL: shorUrl }); 
        res.redirect(urlDB.origin);
    } catch (error) {
        req.flash("mensajes", [{msg: "No existe la Url configurada"}]);
        return res.redirect("/auth/login");
    }
}


module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento,
}