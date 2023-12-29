import { User } from '../models/models.js';





export const registerUser = async ({fName, lName, email, password}) => {
    try{
        let result = await User.create({firstName: fName, lastName: lName, email, password});
        console.log(result);
        return result;
    }
    catch(err){
        return err;
    }
}


export const getUserWithEmail = async (email) => {
    try{
        let result = await User.findOne({ where: { email } });
        return result;
    }
    catch(err){
        return err;
    }
}


export const loginUser = async({email}) => {
    try{
        return await User.findOne({ 
            where : {email},
            attributes : ['password'],
            raw: true
        });
    }
    catch(err){
        return err;
    }
}