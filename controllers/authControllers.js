const User = require("../models/User");
const { validationResult } = require("express-validator");


const registerForm = (req, res) => {
    res.render("register", { mensajes: req.flash("mensajes") });
}


const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/register");
        // return res.json(errors);
    }

    const { userName, email, password } = req.body;
    const tokenID = Math.random().toString(14).slice(2); 

    try {
        let user = await User.findOne({ email: email });
        if (user) throw new Error("Ya existe este usuario.");
        
        user = new User({ userName, email, password, tokenConfirm: tokenID});
        await user.save()
        //enviar corre electronico con la confirmacion de la cuenta
        req.flash("mensajes", [{msg: "Revisa tu correo electronico para confirmar tu cuenta."}]);
        res.redirect("/auth/login");

    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/register");
        // res.json({ error: error.message });
    }
}

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ tokenConfirm: token });

        if (!user) throw new Error("No existe este usuario");

        user.cuentaConfirmada = true;
        user.tokenConfirm = null;

        await user.save();

        req.flash("mensajes", [{msg: "Cuenta Verificada, puedes iniciar sesion."}]);
        res.redirect("/auth/login");

    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/login");
        // res.json({ error: error.message });
    }
};


const loginForm = (req, res) => {
    // ruta de prueba de login
    res.render("login", { mensajes: req.flash("mensajes") });
};


const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/login");
    }
    const { email, password } = req.body; 

    try {
        
        const user = await User.findOne({ email });
        if (!user) throw new Error("Usuario no existe.");
        if (!user.cuentaConfirmada) throw new Error("Falta confirmar cuenta.");
        if (!await user.comparePassword(password)) throw new Error("Contraseña incorrecta.");

        // creando la sesion de usuario a traves de passport
        req.login(user, function (err) {
            if (err) throw new Error("Error al crear sesion.");
            return res.redirect("/");
        });
    } catch (error) {
        // console.log(error);
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/login");
    }
}

const cerrarSesion = (req, res) => {
    req.logout()
    res.redirect("/auth/login");
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
    cerrarSesion,
}