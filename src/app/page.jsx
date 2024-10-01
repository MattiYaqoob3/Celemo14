'use client'; 
import React, { useState, useEffect } from 'react';

const Home= () => {

  const[message, setmessage] = useState("loging")

  useEffect(()=>{
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setmessage(data.message)
      }
    )
  })
  return (
    <div>
      <form action={"/"} method='post'>
      <h1>Hi {message}</h1>
        <input name='userNamee' type="text" />
        <br /> <br></br>
        <button> Send to DB</button>
      
      </form>
    </div>
  )
}

export default Home
