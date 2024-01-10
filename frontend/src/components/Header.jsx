import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import atob from 'atob';

import MyProfile from './MyProfile.jsx';

function Header() {
  let navigate = useNavigate();
  let token = localStorage.getItem('token');
  token = token.split(".")[1];
  let {fName, lName} = JSON.parse(atob(token));
  let userName = `${fName} ${lName}`;

  function logout(){
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header>
      <h1>Keeper</h1>
      <div className="navigation">
      <a className="nav" href="#" onClick={() => {navigate("/home")}}>Home</a>
      <a className="nav" href="#" onClick={() => {navigate("/trash")}}>Deleted</a>
      </div>
      <button className='logout' onClick={logout}> <LogoutIcon /></button> 
      <MyProfile />
    </header>
  );
}

export default Header;
