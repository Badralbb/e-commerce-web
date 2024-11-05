"use client"; 
import { useState } from "react";

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function Submit () {

        fetch("http://localhost:4000/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.ok) {
            console.log("Success");
            
          } else {
            console.log("Error");
          }
        });
      }

    return (
    <div className="container mx-auto">
        <h1>Login</h1>
        <div>
            <input placeholder="Email" className="border-2 rounded-lg" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <input placeholder="Password"
             type="password"
             className="border-2 rounded-lg"
             onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button onClick={Submit} className="bg-green-600">submit</button>
    </div>
    )
}