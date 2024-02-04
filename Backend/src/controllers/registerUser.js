import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserService from '../services/UserService.js';
import responseHandler from '../../util/responseHandler.js';




export const registerUser = async (req, res) => {
    try{
        let { fName, lName, email, password } = req.body;
        console.log(req.body);
        const hashedPass = await bcrypt.hash(password, 5);

        let emailTaken = await UserService.getUserWithEmail(email);
        if(emailTaken) return res.status(400).send("please chose another email , this email is already taken");

        let result = await UserService.registerUser({fName, lName, email, password: hashedPass});
        responseHandler(res, "false", 200, result, "user added successfully !");
    }
    catch(err){
        console.log(err);
        res.status(400).send("error encountered !");
    }
}

export const loginUser = async (req, res) => {
    try{
        let { email, password } = req.body;
        console.log(req.body);
        
        let { password: hash, id: userId, firstName: fName, lastName: lName } =   await UserService.getHashedPass({email}) || {};
        
        let result = (hash && userId) && await bcrypt.compare(password, hash);

        if(result){
            let token = await jwt.sign({ 'userId': userId, 'fName': fName, 'lName': lName }, 'xyzyxyzyx', { algorithm: 'HS256' });
            responseHandler(res, "false", 200, token, "successfully logged in");
        } 
        else responseHandler(res, "true", 403, result,  "incorrect email/pass");
    }
    catch(err){
        console.log(err);
        res.status(400).send("error encountered !", err.message);
    }
}


export const getUserProfileByUserId = async(req, res, next) => {
    try{
        let { userId } = req.query;
        let result = await UserService.getUserProfileByUserId(userId);
        return res.status(200).send(result);
    }
    catch(err){
        console.log(err);
        return res.status(400).send(err.message);
    }
}
