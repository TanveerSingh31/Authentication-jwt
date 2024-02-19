import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useDispatch } from "react-redux";
import { increment } from "../Redux/Slices/addTask.js";


function CreateArea(props) {

  const [ text, setText ] = useState({ title: "", content: ""});
  const [ writing, setWriting ] = useState(false);

  const dispatch = useDispatch();

  function ChangeText(e){
    let {name, value} = e.target; 
    setText((prevValue)=>{
      return { ...prevValue, [name]: value}  
    });
  }

  return (
    <div>
      <form className="create-note">
        {writing && <input name="title" placeholder="Title" onChange={ChangeText} value={text.title}/>}
        <textarea name="content" placeholder="Take a note..." rows={ writing ? "3" : "1"} onChange={ChangeText} value={text.content} onClick={()=>{ setWriting(true); }}/>
       {writing && <zoom in={writing}>
        <Fab onClick={(e)=>{
            props.addTask(text);
            dispatch(increment());
            setText({title:"", content:""});
            e.preventDefault();
          }}><AddIcon />
        </Fab>
       </zoom>}
        
      </form>
    </div>
  );
}

export default CreateArea;
