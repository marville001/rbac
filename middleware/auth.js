const jwt = require('jsonwebtoken');
const roles = require('../utils/roles.permissions.json')

module.exports = {
    authenticated : (req, res, next) => {
        console.log(req.headers);
        let token = req.header('x-auth-token');
        if (!token) return res.status(401).json({ message: "Access denied. No token provided" });
        try {
            const data = jwt.verify(token, process.env.SECRET_KEY)
            req.user = data;
            next();
        } catch (error) {
            res.status(400).json({ message: "Invalid token" })
        }    
    },
    hasPermission: (activity)=>(req,res, next)=>{
        const {role} = req.user;
        if(roles[role].includes(activity)){
            next()
        }else{
            return res.status(403).send({ success: false, message: "Access denied. " });
        }
    }
}