import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import atob from 'atob';
import axios from 'axios';

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Note from "../components/Note.jsx";
import CreateArea from "../components/CreateArea.jsx";
import Config from '../config.json'


function HomePage() {
    const navigate = useNavigate();

    const [taskArr , setArr] = useState([]);  
    const [taskArr2 , setArr2] = useState([]); 

    let token = window.localStorage.getItem("token");

    let tokenArr = token.split('.');
    let tokenData = JSON.parse(atob(tokenArr[1]));

    // useEffect function is called after rendering logic i.e code beneath it gets executed
    // https://chat.openai.com/c/cd0322c1-5088-4a2a-8f92-e312030f69ce
    // order of execution 
    /* The component function is called.
        The JSX is rendered.
        The component function completes, and the render is committed to the DOM.
        After the render is committed, the code inside the useEffect hook is executed.
    */
    
    useEffect(()=>{
        console.log("cAlled==========!!!!===================")
        async function getData(){
            let result = await axios.get(Config.BASE_URL, { params: { userId: tokenData.userId }});
            setArr2(result.data);   
        }
        getData();

        if(!token){ navigate("/login") }

    }, [taskArr]);





    async function addTask(task){
        let res = await axios.post(Config.BASE_URL, {   // we call API's before setting the arr value, because as soon as we call setArr method , it will cause change in taskArr , and this in turn will invoke useEffect function and which will hit get API for the tasks , which is still not added in the db , therefore it will not return the new task added, to avoid this we hit the API first and then render the page
            title: task.title, 
            body: task.content,
            userId: tokenData.userId
        });

        setArr((prevValue)=>{
            return [...prevValue, task];
        });
        alert("Task Added !");
    }


    async function deleteTask(taskId){
        let res = await axios.delete(Config.BASE_URL, {
            params : { taskId }
        });

        setArr((prevValue)=>{
            return prevValue.filter((el)=>{
               return el.taskId !== taskId;
            });
        });
    }

    async function updateTask(taskData){
        let res = await axios.put(Config.BASE_URL, {
            taskData
        });
    }

    async function markTaskCompleted(taskId, taskStatus){
        console.log("marking it complete in frontend!");
        let res = await axios.put(`${Config.BASE_URL}${taskId}`, {
            taskStatus
        });
    }
    
    try{    
        if(!token) return;

        let tokenArr = token.split('.');
        let data = JSON.parse(atob(tokenArr[1]));

        return (
            <div>
                <Header />
                <CreateArea addTask={addTask} />
                { taskArr2.map( (el, i) => { return <Note key={el.taskId} title={el.title} content={el.body} taskId={el.taskId} deleteTask={deleteTask} updateTask={updateTask} markTaskStatus={markTaskCompleted} taskStatus={el.taskStatus} createdAt={el.createdAt} calledFromDeletedPage={false}/>})} 
    
                <Footer />
            </div>
        );
    }
    catch(err){
        console.log(err);
        return err;
    }
    
}


export default HomePage;