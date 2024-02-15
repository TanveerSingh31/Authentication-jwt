import React, { useState } from 'react';
import LoadingPage from '../components/Loading.jsx';
import Button from '@mui/material/Button';
import CustomAlert from '../components/CustomAlert.jsx';


const LoginForm = (props) =>{

    const [isLoading, setIsLoading] = useState(false);
    const [ message, setMessage ] = useState(null);

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
        let response = await props.login(userInfo);
        if(response?.response?.data?.error) setMessage('');
        setIsLoading(false);
    }



    return (
        <>
            {isLoading && <LoadingPage />}
            {!isLoading &&
                <div>
                    <CustomAlert alertMessage={message}/>
                    <div className="Form">
                        <input placeholder="email" type="email" name='email' onChange={setInfo}></input>
                        <input placeholder="password" type="password" name='password' onChange={setInfo}></input>
                        <Button type="submit" onClick={signIn} variant='contained'>Login</Button>
                    </div>
                </div>
            }
        </>
    );

}


export default LoginForm;