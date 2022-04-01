const Url = require("../models/Url")
const leerUrls = async (req, res) => {
    try {
        const urls = await Url.find().lean()
        res.render('home', { urls: urls })
    } catch (error) {
        console.log(error)
        res.send("fallo algo")
    }
};

const agregarUrl = async (req, res) => {

    const { origin } = req.body;
    const shortUrlId = Math.random().toString(16).slice(2);

    try {
        const url = new Url({origin: origin, shortURL: shortUrlId});
        await url.save();
        res.redirect("/");
    } catch (error) {
        console.log(error)
        res.send("error algo fallo")
    }
};

const eliminarUrl = async (req, res) => {
    const { _id } = req.params;
    try {

        await Url.findByIdAndDelete(_id)
        res.redirect("/");

    } catch (error) {
        console.log(error)
        res.send("error algo fallo")
    }
}

const editarUrlForm = async (req, res) => {
    const { _id } = req.params;
    try {
        const urlDB = await Url.findById(_id).lean();
        res.render("home", {urlDB});

    } catch (error) {
        console.log(error)
        res.send("error algo fallo")
    }
}

const editarUrl = async (req, res) => {
    const { _id } = req.params;
    const { origin } = req.body;
    try {
        await Url.findByIdAndUpdate(_id, { origin: origin }).lean()
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.send("error algo fallo")
    }
}

const redireccionamiento = async (req, res) => {
    const { shorUrl } = req.params;
    try {
        const urlDB = await Url.findOne({ shortURL: shorUrl }); 
        res.redirect(urlDB.origin);
    } catch (error) {
        
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