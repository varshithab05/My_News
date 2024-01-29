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
  const [temp,setTemp] = useState();
  const [lat,setLat] = useState();
  const [lon,setLon] = useState();
    
  useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    axios.get(`http://api.weatherapi.com/v1/current.json?q=13.5631658,80.0199452&key=dcdd6e0821ac4a808b3145541242901`,signal)
    .then((response)=>{
      console.log(response.data.location.name);
      setPlace(response.data.location.name);
      console.log(response.data.current.temp_c);
      setTemp(response.data.current.temp_c);
    }).catch(function(error){
        if (error.name === 'AbortError') {
            console.log('Request aborted');
        } else {
            console.log('Error:', error);
        }
    });
    return () => {
        controller.abort();
    };
  },[lat,lon]);

  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  },[]);
  return (
    <div className='sbar'> 
      <div className='date adBox'>
        <MdDateRange size={20}/>
        <p className='d'>{currDate}</p>
        <p>{currDay}</p>
      </div>
      <div className='climate adBox'>
        <TiWeatherPartlySunny size={20} />
        <p>{place}</p>
        <p>temperature : {temp} C</p>
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
