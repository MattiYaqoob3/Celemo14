"use client";
import { useEffect, useState } from "react";

const Login = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('http://localhost:8080/api/user');
      const json = await res.json();
      setData(json);
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>login</h1>
      {
        data.map((user) => (
          <div key={user.id}>{user.username}
        </div>
          
        ))
      }
    </div>
  );
}

export default Login;