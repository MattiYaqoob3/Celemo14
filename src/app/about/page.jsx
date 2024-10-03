"use client";
import React, { useEffect, useState } from "react";

function about() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchdate = async()=>{
      try {
        const response =  fetch("http://localhost:8080/api/user", {
          method: "GET",
          headers: {
            aders: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        });
        const result = await res.json();
        setdata(result)
      } catch (err) {
        console.log(err, "error");
      }
    }
    
    fetchdate();
    console.log(data)
  },[]);


  return (
    <div>
      <h1>Get all Users</h1>
      {data.map((username)=> (
        <div key={username.id}>{data.username}
        <div className="">users :{data.username}</div>
        </div>
        
      ))}
    </div>
    
  );
 
}
export default about;
