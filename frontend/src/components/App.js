import RegisterForm from '../Pages/RegisterPage.jsx';
import LoginForm from '../Pages/LoginPage.jsx';
import HomePage from '../Pages/HomePage.jsx'
import DeletedTasks from '../Pages/DeletedTasks.jsx';
import Config from '../config.json';
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  const registerUser = async (userInfo) => {
    try{
      let result = await axios.post(`${Config.BASE_URL2}register`, 
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
      let result = await axios.post(`${Config.BASE_URL2}login`,
        userInfo
      );
      console.log("result", result);
      let token = result.data.data;
      window.localStorage.setItem("token", token);
      if(window.localStorage.getItem("token")) navigate("/home");
    }
    catch(err){
      // if(err.response.data.error) alert(err.response.data.message);
      console.log(err);
      console.log(`${Config.BASE_URL2}login`);
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
    <Route path="/home" element={ <HomePage />}/>
    <Route path="/trash" element={ <DeletedTasks />}/>
  </Routes>
  );
}

export default App;