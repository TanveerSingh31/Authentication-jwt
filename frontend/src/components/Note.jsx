import React , { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';



function Note(props) {

  let { taskStatus, title, content, createdAt } = props;

  const iconButtonStyle = {
    height: "12px",
    mt: "5px"
  }

  let date = new Date(createdAt);
  

  return (
    <form>
      <div className={`note ${taskStatus == 1 && "completed"} ${taskStatus == 'deleted' && "deleted"}`} >
      <div className='input' name="title" value={title} disabled={true} >{title}</div>
      <div className="body textarea" name="body" rows={5} value={content} disabled={true}>{content}</div>
      
      <p className='flex-right'>{date.toLocaleDateString()}</p>
    </div>
    </form>
    
  );
}

export default Note;
