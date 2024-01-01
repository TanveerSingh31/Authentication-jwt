import React, { useState } from 'react';


const LoginForm = (props) =>{

    let [ userInfo , setUserInfo ] = useState({
        email: "",
        password: ""
    });


    const setInfo = (e) => {
        let { value, name } = e.target;
        setUserInfo((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        });   
    }

    const signIn = (e) => {
        e.preventDefault();
        props.login(userInfo);
    }



    return (
        <div className="Form">
            <input placeholder="email" type="email" name='email' onChange={setInfo}></input>
            <input placeholder="password" type="password" name='password' onChange={setInfo}></input>
            <button type="submit" onClick={signIn}>Login</button>
        </div>
    );

}


export default LoginForm;