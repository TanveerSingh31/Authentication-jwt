import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Note from '../components/Note.jsx';
import axios from 'axios';
import Config from '../config.json';
import fetchTokenData from '../utils/fetchTokenData.js';




export default function DeletedTasks() {
    let token = fetchTokenData();

    let [ taskArr, setTasks ] = useState([]);

    useEffect(()=>{
        const getDeletedTasks = async () => {
            let res = await axios.get(`${Config.BASE_URL}deleted`, { params: { userId: token.userId }});
            setTasks(res.data);
        }
        getDeletedTasks();
    },[]);


    return (
        <div>
            <Header />
            { taskArr.map( el =>  <Note key={el.taskId} title={el.title} content={el.body} calledFromDeletedPage={true} createdAt={el.createdAt} taskStatus='deleted'/>) }
            <Footer />
        </div>
    );
}


