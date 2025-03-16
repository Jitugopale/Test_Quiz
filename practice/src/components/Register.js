import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, SetError] = useState("");

  const handleSubmitData = async (e) => {
    e.preventDefault();
    SetError("");
    try {

      const response = await axios.post("http://localhost:5000/register/api", {
        Name,
        email,
        password,
      });
      console.log(response)
      if (response.status === 200 && response.data.message!=="User already registered") {
        setMessage(response.data.message);
        navigate("/login");
        localStorage.setItem("token",response.data.Token);
        console.log("Token",response.data.Token)
      
      }else if(response.data.message==="User already registered"){
        setMessage("User already exists");
        setTimeout(()=>{
          setMessage("");
        },1000)
        
      }
    } catch (err) {
      console.error("Error:", err);
      SetError("Server Not Reachable");
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-3">
              <h1>Register Page</h1>
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmitData} method="POST">
                <label className='form-label'>Name :</label>
                <input className="form-control" type="text" id="Name" name="Name" value={Name} onChange={(e)=>setName(e.target.value)}></input>
                <label className='form-label'>Email :</label>
                <input
                className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label className='form-label'>Password :</label>
                <input
                className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button className="mt-3" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
