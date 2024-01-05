import React , { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';



function Note(props) {


  let [ editState , setEditState ] = useState(false);
  let [ taskStatus, setStatus ] = useState(props.taskStatus);
  let [ currentTaskData, setTaskData ] = useState({
    taskId: props.taskId,
    title: props.title, 
    body: props.content,
    status: props.taskStatus
  })

  useEffect(()=>{
    let {taskId} = currentTaskData;
    async function markStatus (){ await props.markTaskStatus(taskId, taskStatus) }
    !props.calledFromDeletedPage && markStatus();
  },[taskStatus]);

  

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

  async function taskCompleted(e){
    setStatus(!taskStatus);  
  }

  const iconButtonStyle = {
    height: "12px",
    mt: "5px"
  }

  let date = new Date(props.createdAt);
  

  return (
    <form>
      <div className={`note ${taskStatus && "completed"}`} >
      <input name="title" contentEditable={ editState && "true"} onChange={changeText} value={currentTaskData.title} disabled={!editState} ></input>
      {!props.calledFromDeletedPage && <input className="checkbox" type="checkbox" defaultChecked={taskStatus} onClick={taskCompleted} value={taskStatus}></input>}
      <input className="body" name="body" contentEditable = {editState && "true"} onChange={changeText} value={currentTaskData.body} disabled={!editState}></input>

      {!props.calledFromDeletedPage && <>
      <button onClick={(e)=>{ props.deleteTask(props.taskId); e.preventDefault() }}><DeleteIcon sx={iconButtonStyle}/></button>
      <button onClick={(e)=>{
        setEditState(true);
        e.preventDefault();
      }}> Edit </button>

      { editState && <button onClick={updateTask}> Save </button> }
      </>}
      
      <p>{date.toLocaleDateString()}</p>
    </div>
    </form>
    
  );
}

export default Note;
