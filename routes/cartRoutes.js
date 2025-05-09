const express = require('express');
const { addToCart, removeFromCart, getCartData } = require('../controllers/cartController');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();

// Rutas del carrito
router.post('/addtocart', fetchUser, addToCart);
router.post('/removefromcart', fetchUser, removeFromCart);
router.post('/getcartdata', fetchUser, getCartData);

module.exports = router;