const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({
            errors: "Please authenticate using a valid token"
        });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET); // Usar la variable de entorno para la clave secreta
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({
            errors: "Please authenticate using a valid token"
        });
    }
};

module.exports = fetchUser;