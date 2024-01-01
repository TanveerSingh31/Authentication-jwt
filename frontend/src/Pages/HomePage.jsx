import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import atob from 'atob';


function HomePage() {
    const navigate = useNavigate();

    const token = window.localStorage.getItem("token");

    useEffect(()=>{
        if(!token){ navigate("/login") }
    });
    
    try{    
        console.log(token);
        let tokenArr = token.split('.');
        let data = JSON.parse(atob(tokenArr[1]));

        return (
            <div>this is home page, your userId is {data.userId}</div>
        );
    }
    catch(err){
        return err;
    }
    
}


export default HomePage;