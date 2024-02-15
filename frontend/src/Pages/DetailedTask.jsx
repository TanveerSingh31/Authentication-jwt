import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {createTheme} from '@mui/material/styles';



export default function DetailedTask(props){
    
    let { taskData } = props;

    let [editState, setEditState] = useState(false);
    let [taskStatus, setStatus] = useState(taskData.taskStatus);
    let [currentTaskData, setTaskData] = useState(taskData);

    useEffect(()=>{
        let {taskId} = currentTaskData;
        async function markStatus (){ await props.markTaskStatus(taskId, taskStatus) }
        markStatus();
    },[taskStatus]);

    const theme = createTheme({
        palette: {
          darkBlue: {
            main: "#000435"
          }
        }
    });

    let date = new Date(taskData.createdAt);

    function changeText(e){
        let { name, value } = e.target;
        setTaskData((prevValue)=>{
          return ({
          ...prevValue,
          [name] : value 
          });
        });
    }

    async function updateTask(e){
        e.preventDefault(); 
        await props.updateTask(currentTaskData); 
        setEditState(false);
    }
    
    async function markStatus (){
        
        let {taskId} = currentTaskData;
        await props.markTaskStatus(taskId, !taskStatus);
        setStatus(!taskStatus);
    }
    
    async function taskCompleted(e){
        setStatus(!taskStatus);  
    }

    const iconButtonStyle = {
        height: "12px",
        mt: "5px"
    }
 

    return (
        <form >
            <div className='detailTask-div'>
                <input name="title" contentEditable={editState && "true"} onChange={changeText} value={currentTaskData.title} disabled={!editState} ></input>

                <textarea className="body" name="body" rows={10} contentEditable={editState && "true"} onChange={changeText} value={currentTaskData.body} disabled={!editState}></textarea>

                {/* buttons */}
                <div className='button-list'>

                    {!props.calledFromDeletedPage && <>

                        <Button onClick={(e) => {
                            setEditState(true);
                            e.preventDefault();
                        }} variant="outlined" color="warning"> Edit </Button>

                        <Button onClick={(e) => { props.deleteTask(taskData.taskId); e.preventDefault() }}variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>

                        {!taskStatus && <Button onClick={taskCompleted} value={taskStatus} variant="contained" color="success">Done</Button>}

                        {taskStatus && <Button onClick={taskCompleted} value={taskStatus} variant="contained" sx={{ fontSize: 12}}>Not Done</Button>}

                        {<Button onClick={updateTask} variant="contained"  disabled={!editState}> Save </Button>}
                    </>}
                </div>

                {/* <p className='flex-right'>{date.toLocaleDateString()}</p> */}
            </div>
        </form>
    )



}