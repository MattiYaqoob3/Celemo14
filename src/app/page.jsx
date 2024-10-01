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
      <h1>Hi {message}</h1>
    </div>
  )
}

export default Home
