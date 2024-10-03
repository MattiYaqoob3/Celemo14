"use client";
import { useState } from "react";

export default function Home() {

  const [username, setusername] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault(); // this for showing the err message
    try{
      const response = await fetch('http://localhost:8080/api/user',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username
        })
      })
      
    }catch(err){
      console.log(err, "error")
      setResponseMessage('Failed to create user');
    }
     
  }


  return(
    
    <div>
      <h1>Save your name in DB</h1>

      <form action="/" onSubmit={handleSubmit}>
      <input type="text" onChange={(e)=> setusername(e.target.value)} /><br />
      <button type="submit">Send</button>
      </form>
      
    
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}
