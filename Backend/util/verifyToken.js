import jwt from 'jsonwebtoken';
import responseHandler from './responseHandler.js';



const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){ return responseHandler(res, "true", 401, "", "you are not authorized to perform this action!")}
    
    try{
        let decodedData = jwt.verify(token, 'xyzyxyzyx');
        req.userId = decodedData.userId;
        next();
    }
    catch(err){
        res.status(400).send(err);
    }
} 


export default verifyToken;