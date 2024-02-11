import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import atob from 'atob';
import axios from 'axios';
import moment from 'moment';

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Note from "../components/Note.jsx";
import CreateArea from "../components/CreateArea.jsx";
import Config from '../config.json'
import fetchTokenData from '../utils/fetchTokenData.js';
import LoadingScreen from '../components/Loading.jsx';
import DetailedTask from './DetailedTask.jsx';
import {Paper, Box, Dialog, DialogTitle, DialogContent} from '@mui/material';


function HomePage() {
    const navigate = useNavigate();

    const [taskArr , setArr] = useState([]);  
    const [taskArr2 , setArr2] = useState([]); 
    const [isLoading, setLoading] = useState(true); // isLoading is saved true initially, because if I put this is in useEffect then it will run after my code has been executed , which will display my components first and then displays loading screen
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    let tokenData = fetchTokenData();

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
        if(!tokenData){ navigate("/login"); return; }

        async function getData(){
            let result = await axios.get(Config.BASE_URL, { params: { userId: tokenData.userId }});
            setArr2(result.data);   
            setLoading(false);
        }
        getData();

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
        setArr([]);
    }

    async function markTaskCompleted(taskId, taskStatus){
        console.log("marking it complete in frontend!");
        let res = await axios.put(`${Config.BASE_URL}${taskId}`, {
            taskStatus
        });
        setArr([]);
    }

    function taskClicked(task){
        console.log(task);
        setSelectedTask(task);
        setOpenDialog(true);
    }

    function handleCloseDialog(){
        setOpenDialog(false);
    }

    function getTasks(taskArr2, date){

        let arrOutput = [];

        taskArr2.forEach((el) => { 

            let taskDate = moment(el.createdAt);
            let today = moment();

            if(date == 'today' && taskDate.isSame(today, 'day')){
                arrOutput.push(<div onClick={() => {taskClicked(el)}}><Note key={el.taskId} title={el.title} content={el.body} taskId={el.taskId} taskStatus={el.taskStatus} createdAt={el.createdAt}/></div>)
            }
            else if(date == 'before' && taskDate.isBefore(today, 'day')){
                arrOutput.push(<div onClick={() => {taskClicked(el)}}><Note key={el.taskId} title={el.title} content={el.body} taskId={el.taskId} deleteTask={deleteTask} updateTask={updateTask} markTaskStatus={markTaskCompleted} taskStatus={el.taskStatus} createdAt={el.createdAt}/></div>)
            }
        });

        return arrOutput;

        // <Note key={el.taskId} title={el.title} content={el.body} taskId={el.taskId} deleteTask={deleteTask} updateTask={updateTask} markTaskStatus={markTaskCompleted} taskStatus={el.taskStatus} createdAt={el.createdAt}/>
    }
    
    try{    
        
        if(!tokenData) return;

        return (
            <>
                {isLoading && <LoadingScreen />}
                {!isLoading && <>
                    <Header />
                    <CreateArea addTask={addTask} />
                    
                    {/* get todays tasks */}
                    { getTasks(taskArr2, 'today').length > 0 && <p className='text-center'>---------- Today ----------</p>}
                    <div class="task-container">
                        { getTasks(taskArr2, 'today') }
                    </div>

                    {/* get before tasks */}
                    { getTasks(taskArr2, 'before').length > 0 && <p className='text-center'>---------- Before ----------</p>}
                    <div class="task-container">
                        { getTasks(taskArr2, 'before') }
                    </div>

                    {/* detailed view of task */}
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                      {selectedTask && <DetailedTask taskData={selectedTask} deleteTask={deleteTask} updateTask={updateTask} markTaskStatus={markTaskCompleted}/>}
                    </Dialog>


                    
                    <Footer />
                </>}
            </>
        );
    }
    catch(err){
        console.log(err);
        return err;
    }
    
}


export default HomePage;