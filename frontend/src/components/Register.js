import React, {useState} from 'react';


const RegisterForm = (props) => {

    let [userInfo, setInfo] = useState({
        fName: "",
        lName: "",
        email: "",
        password: ""
    });


    const userInfoChange = (e) => {
        let { name , value } = e.target;

        setInfo((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        });
    }



    const register = async (e)=>{
        e.preventDefault();
        props.register(userInfo); 
    }

    return (
        <div className="Form">
            <input placeholder="firstName" name='fName' onChange={userInfoChange}></input>
            <input placeholder="lastName" name='lName' onChange={userInfoChange}></input>
            <input placeholder="email" type="email" name='email' onChange={userInfoChange}></input>
            <input placeholder="password" type="password" name='password' onChange={userInfoChange}></input>
            <button type="submit" onClick={register}>Register</button>
        </div>
    );
}



export default RegisterForm;