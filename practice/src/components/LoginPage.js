import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
      const [error, SetError] = useState("");

    const handleLogin = async(e)=>{
        e.preventDefault();
        setMessage("")
        SetError("")

        console.log("Login Click")

        try {
          const token = localStorage.getItem("token")
          console.log(token)
          
            const response = await axios.post("http://localhost:5000/register/login",{
                email,
                password
            },{
              headers:{
                'authorization': token
              }
            });
            console.log(response);
            // localStorage.getItem("token",response.data.token)
            // console.log("Reaponse",response.data.token)
    
            if(response.data.message==="Login Sucessfully"){
              localStorage.setItem("authToken",token)
              console.log("Set",token)
                setMessage("Login Successful");
                setTimeout(()=>{
                  setMessage("");
                },1000)
                setInterval(()=>{
                  navigate('/comp');
                },2000)
                
            }else if(response.data.message === "Invalid Credentials") {
              SetError("Invalid credentials");
              setTimeout(()=>{
                SetError("");
              },1000)
                
            }
            
        } catch (error) {
            console.error("Error:",error);
            SetError("Server Not reachable");
        }

       
    }
  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='card p-3'>
                <h1>Login Page</h1>
                {message && <div className='alert alert-success'>{message}</div>}
                {error && <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={handleLogin} method='POST'>
                    <label className='form-label'>Email</label>
                    <input className='form-control' type='text' value={email} name='email' id='email' onChange={(e)=>setEmail(e.target.value)}></input>
                    <label className='form-label'>Password</label>
                    <input className='form-control' type='password' value={password} name='password' id='password' onChange={(e)=>setPassword(e.target.value)}></input>
                    <button className='mt-3' type='submit'>Submit</button>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
