import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import atob from 'atob';

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
      <a className="nav" href="/home">Home</a>
      <a className="nav" href="/trash">Deleted Tasks</a>
      <button className='logout' onClick={logout}> <LogoutIcon /></button> 
      <span className="userName">{token && userName}</span>
    </header>
  );
}

export default Header;
