const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware =  (req,res,next )=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(authHeader);
        return res.status(406).json({});
    }
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(407).json({});
    }
};

module.exports={
    authMiddleware
};
