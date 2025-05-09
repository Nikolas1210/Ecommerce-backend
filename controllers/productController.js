const Product = require('../models/Product');

// Crear producto
const addProduct = async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    });
};

// Eliminar producto
const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        id: req.body.id,
        name: req.body.name
    });
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    res.json(products);
};

// Obtener nueva colección
const getNewCollection = async (req, res) => {
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);
    res.json(new_collection);
};

// Obtener productos populares en mujeres
const getPopularInWomen = async (req, res) => {
    let popularWomen = await Product.find({ category: "women" });
    let popularInWomen = popularWomen.slice(0, 4);
    res.json(popularInWomen);
};

module.exports = { addProduct, removeProduct, getAllProducts, getNewCollection, getPopularInWomen };