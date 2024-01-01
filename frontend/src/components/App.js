import RegisterForm from './Register.js';
import LoginForm from './Login.js';
import HomePage from '../Pages/HomePage.jsx'
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  const registerUser = async (userInfo) => {
    try{
      let result = await axios.post("http://localhost:5000/register", 
        userInfo
      );
      alert(result.data.message);
    }
    catch(err){
      console.log(err);
      alert(err.response.data);
      return err;
    } 
  }

  const loginUser = async (userInfo) => {
    try{
      let result = await axios.post("http://localhost:5000/login",
        userInfo
      );
      let token = result.data.data;
      window.localStorage.setItem("token", token);
      alert(result.data.message); 
      if(window.localStorage.getItem("token")) navigate("/home");
    }
    catch(err){
      console.log(err);
      // alert(err.response.data.message);
      return err;
    }
  }



  // We have to add Route tag multiple times for each page we want in our application
  // each Route tag taken 2 args. PATH and ELEMENT (which react component you want to load when user hits that path)

  return (
  <Routes>
    <Route path="/" element={ <RegisterForm register={registerUser}/>}/>
    <Route path="/login" element={ <LoginForm login={loginUser}/> }/>
    <Route path="/home" element={ <HomePage sample={(err)=>{console.log(err)}}/>}/>
  </Routes>
  );
}

export default App;