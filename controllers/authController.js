const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de tener un modelo separado para User

// Registro de usuarios
const signup = async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "Email already exists",
        });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({
        success: true,
        token
    });
};

// Inicio de sesión
const login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({
                success: true,
                token
            });
        } else {
            res.status(400).json({
                success: false,
                errors: "Wrong password",
            });
        }
    } else {
        res.status(400).json({
            success: false,
            errors: "Wrong email",
        });
    }
};

module.exports = { signup, login };