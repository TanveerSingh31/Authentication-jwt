import React, { useState } from 'react';
import LoadingPage from '../components/Loading.jsx';
import Button from '@mui/material/Button';


const LoginForm = (props) =>{

    let [isLoading, setIsLoading] = useState(false);

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

    const signIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await props.login(userInfo);
        setIsLoading(false);
    }



    return (
        <>
            {isLoading && <LoadingPage />}
            {!isLoading && <div className="Form">
            <input placeholder="email" type="email" name='email' onChange={setInfo}></input>
            <input placeholder="password" type="password" name='password' onChange={setInfo}></input>
            <Button type="submit" onClick={signIn} variant='contained'>Login</Button>
            </div>}
        </>
    );

}


export default LoginForm;