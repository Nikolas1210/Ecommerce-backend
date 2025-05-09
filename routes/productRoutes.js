const express = require('express');
const {
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollection,
    getPopularInWomen
} = require('../controllers/productController');
const router = express.Router();

// Rutas de productos
router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', getAllProducts);
router.get('/newcollection', getNewCollection);
router.get('/popularinwomen', getPopularInWomen);

module.exports = router;