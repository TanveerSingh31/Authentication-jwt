import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import atob from 'atob';


function HomePage(props) {
    const navigate = useNavigate();
    const location = useLocation();

    let token = window.localStorage.getItem("token");


    // useEffect function is called after rendering logic i.e code beneath it gets executed
    // https://chat.openai.com/c/cd0322c1-5088-4a2a-8f92-e312030f69ce
    // order of execution 
    /* The component function is called.
        The JSX is rendered.
        The component function completes, and the render is committed to the DOM.
        After the render is committed, the code inside the useEffect hook is executed.
    */

    useEffect(()=>{
        console.log("=======================================");
        if(!token){ navigate("/login") }
    },[location.pathname]);

    console.log("*********************************");
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    
    try{    
        if(!token) return;

        let tokenArr = token.split('.');
        let data = JSON.parse(atob(tokenArr[1]));

        return (
            <>
            <div>this is home page, your userId is {data.userId}</div>
            <button className='logout' onClick={logout}> <LogoutIcon /></button> 
            </>
            
        );
    }
    catch(err){
        console.log(err);
        return err;
    }
    
}


export default HomePage;