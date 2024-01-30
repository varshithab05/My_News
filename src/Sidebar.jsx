import './sidebar.css';
import { Button } from 'react-bootstrap';
import { MdDateRange } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import React, { useEffect, useState } from 'react';
import { GiGoldBar } from "react-icons/gi";
import axios from 'axios';


function setDateT(){
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}-${month}-${year}`;
}
function day(){
  const today = new Date();
  const d = today.getDay();
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return days[d-1];
}
function Sidebar() {
  const [currDate , setDate] = useState(setDateT());
  const [currDay ,setDay] = useState(day());
  const [place,setPlace] = useState();
  return (
    <div className='sbar'> 
      <div className='date adBox'>
        <MdDateRange size={20}/>
        <p className='d'>{currDate}</p>
        <p>{currDay}</p>
      </div>
      <div className='prices adBox'>
        <GiGoldBar size={30} />
        <p>Check out live prices: </p>
        <p>gold</p>   
        <p>silver</p>
        <p>platinum</p>
        <a target="_blank" href='https://main--unique-mandazi-c7bff0.netlify.app/'><Button>Check Now!</Button></a>
      </div>
    </div>
  )
}

export default Sidebar
