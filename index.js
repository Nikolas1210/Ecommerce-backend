const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

//Importing middleware
const fetchUser = require('./middlewares/fetchUser');


//Load .env
dotenv.config();


//Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Salir del proceso si la conexión falla
    }
};

connectDB();


app.listen(port, (error) => {
    if (!error) {
        console.log('Server is running on port', port);
    }
    else {
        console.log('Error while running server', error);
    }
});

//API REQUESTS




const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Usar las rutas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);







//API Creation

app.get('/', (req, res) => {
    res.send('Express app is running');
});





//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//Creating upload metod
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
})




//Creatind endpoint for users registration
// app.post("/signup", async (req, res) => {

//     let check = await User.findOne({ email: req.body.email });
//     if (check) {
//         return res.status(400).json({
//             success: false,
//             errors: "Email already exists",
//         })
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//         cart[i] = 0;

//     }
//     const user = new User({
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         cartData: cart
//     });

//     await user.save();

//     const data = {
//         user: {
//             id: user.id
//         }
//     }

//     const token = jwt.sign(data, process.env.JWT_SECRET); // Usar la variable de entorno
//     res.json({
//         success: true,
//         token
//     });
// })


//creating endpoint for users login
// app.post("/login", async (req, res) => {
//     let user = await User.findOne({ email: req.body.email });

//     //If the user is found
//     if (user) {
//         const passCompare = req.body.password === user.password;
//         //If the password is correct
//         if (passCompare) {
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             }
//             const token = jwt.sign(data, process.env.JWT_SECRET); // Using the .env file for the secret
//             res.json({
//                 success: true,
//                 token
//             });
//         }

//         //If the passsword is wrong
//         else {
//             res.status(400).json({
//                 success: false,
//                 errors: "Wrong password",
//             })
//         }
//     }
//     else {
//         res.status(400).json({
//             success: false,
//             errors: "Wrong email",
//         })
//     }
// })


//creating endpoint for newcollection data
// app.get('/newcollection', async (req, res) => {
//     let products = await Product.find({});
//     let new_collection = products.slice(1).slice(-8); //Get the last 8 products from the array
//     console.log("New collection sent");
//     res.json(new_collection);
// })

//creating endpoint for popular women section
// app.get('/popularinwomen', async (req, res) => {
//     let popularWomen = await Product.find({
//         category: "women"
//     });
//     let popularInWomen = popularWomen.slice(0, 4);
//     console.log("Popular in Women sent");
//     res.json(popularInWomen);

// });


//API FOR CREATING PRODUCTS
// app.post('/addproduct', async (req, res) => {
//     let products = await Product.find({});
//     let id;
//     if (products.length > 0) {
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id + 1;
//     }
//     else {
//         id = 1;
//     }
//     const product = new Product({
//         id: id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//     });
//     console.log(product);
//     await product.save();
//     console.log('Product added');
//     res.json({
//         success: true,
//         name: req.body.name,
//     });
// });

//API FOR DELETING PRODUCTS
// app.post('/removeproduct', async (req, res) => {
//     await Product.findOneAndDelete({ id: req.body.id });
//     res.json({
//         success: true,
//         id: req.body.id,
//         name: req.body.name
//     });
//     console.log('Product deleted');
// });


//API FOR GETTING PRODUCTS
// app.get('/allproducts', async (req, res) => {
//     let products = await Product.find({});
//     res.json(products);
//     console.log('Products sent');
// });

//creating endpoint for adding products in cartdata
// app.post('/addtocart', fetchUser, async (req, res) => {
//     console.log(req.body, req.user)
//     let userData = await User.findOne({ _id: req.user.id });
//     userData.cartData[req.body.itemId] += 1;
//     await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//     res.json({
//         success: true,
//         cartData: userData.cartData
//     });
// });


//creating endpoint for remove caart item
// app.post('/removefromcart', fetchUser, async (req, res) => {
//     let userData = await User.findOne({ _id: req.user.id });
//     if (userData.cartData[req.body.itemId] > 0) {
//         userData.cartData[req.body.itemId] -= 1;
//     }
//     await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//     res.send("REMOVED FROM CART");

// });


//Creating endpoint to fet cartdata
// app.post('/getcartdata', fetchUser, async (req, res) => {
//     let userData = await User.findOne({ _id: req.user.id });
//     res.json({
//         success: true,
//         cartData: userData.cartData
//     });
//     console.log("Cart data sent");
// });

//creating middleware for authentication
// const fetchUser = async (req, res, next) => {
//     const token = req.header('auth-token');
//     if (!token) {
//         return res.status(401).send({
//             errors: "Please authenticate using a valid token"
//         });
//     }
//     try {
//         const data = jwt.verify(token, process.env.JWT_SECRET); // Using the .env file for the secret
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({
//             errors: "Please authenticate using a valid token"
//         });
//     }
// };