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

    return User.findOne({ 
        where : {email},
        attributes : ['password', 'id', 'firstName', 'lastName'],
        raw: true
    });
}

export const getUserProfileByUserId = async (userId) => {
    return User.findOne({
        where: { id: userId },
        attributes: {exclude: ['password']},
        raw: true
    });
}