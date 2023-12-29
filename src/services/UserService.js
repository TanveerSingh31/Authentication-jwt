import * as UserRepository from '../repository/UserRepository.js';



export const registerUser = async ({fName, lName, email, password}) => {
    try{
        let result = await UserRepository.registerUser({fName, lName, email, password});
        return result;
    }
    catch(err){
        return err;
    }
}



export const getUserWithEmail = async (email) => {
    try{
        return UserRepository.getUserWithEmail(email);
    }
    catch(err){
        return err;
    }
}


export const getHashedPass = async ({email}) => {
    try{
        return UserRepository.loginUser({email});
    }
    catch(err){
        return err;
    }
}