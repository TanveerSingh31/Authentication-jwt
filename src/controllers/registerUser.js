import bcrypt from 'bcrypt';
import * as UserService from '../services/UserService.js';
import responseHandler from '../../util/responseHandler.js';




export const registerUser = async (req, res) => {
    try{
        let { fName, lName, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 5);

        console.log(hashedPass);

        let emailTaken = await UserService.getUserWithEmail(email);
        if(emailTaken) return res.status(400).send("please chose another email , this email is already taken");

        let result = await UserService.registerUser({fName, lName, email, password: hashedPass});
        responseHandler(res, "false", 200, result, "user added successfully !");
    }
    catch(err){
        console.log(err);
        res.send("error encountered !");
    }
}

export const loginUser = async (req, res) => {
    try{
        let { email, password } = req.body;
        
        let { password: hash } = await UserService.getHashedPass({email});

        let result = await bcrypt.compare(password, hash);

        if(result) responseHandler(res, "false", 200, result, "successfully logged in");
        else responseHandler(res, "true", 403, result,  "incorrect email/pass");
    }
    catch(err){
        console.log(err);
        res.send("error encountered !");
    }
}
