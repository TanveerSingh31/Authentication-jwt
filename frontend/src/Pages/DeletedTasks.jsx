import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Note from '../components/Note.jsx';
import axios from 'axios';
import Config from '../config.json';
import fetchTokenData from '../utils/fetchTokenData.js';




export default function DeletedTasks() {
    let token = fetchTokenData();
    let navigate = useNavigate();

    let [ taskArr, setTasks ] = useState([]);

    useEffect(()=>{
        if(!token){ 
            navigate("/login");
            return; 
        }

        const getDeletedTasks = async () => {
            let res = await axios.get(`${Config.BASE_URL}deleted`, { params: { userId: token.userId }});
            setTasks(res.data);
        }
        getDeletedTasks();
    },[]);


    if(!token) return;

    return (
        <div>
            <Header />
            <h1>Deleted Tasks</h1>
            { taskArr.map( el =>  <Note key={el.taskId} title={el.title} content={el.body} calledFromDeletedPage={true} createdAt={el.createdAt} taskStatus='deleted'/>) }
            <Footer />
        </div>
    );
}


