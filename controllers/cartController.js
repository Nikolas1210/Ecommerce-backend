const User = require('../models/User');

// Agregar al carrito
const addToCart = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({
        success: true,
        cartData: userData.cartData
    });
};

// Eliminar del carrito
const removeFromCart = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("REMOVED FROM CART");
};

// Obtener datos del carrito
const getCartData = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    res.json({
        success: true,
        cartData: userData.cartData
    });
};

module.exports = { addToCart, removeFromCart, getCartData };