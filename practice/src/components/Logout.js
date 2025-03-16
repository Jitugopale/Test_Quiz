import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        const isLogout = window.confirm("Are you want to Logout");
        if(isLogout){
            setTimeout(()=>{
                try {
                    localStorage.removeItem('authToken');
                    navigate('/login')
                    window.location.reload(); // ✅ Refresh to ensure logout is effective

        
                } catch (error) {
                    console.error("Error logout",error)
                }
            },500)
        }
       
       
    }
  return (
    <>
       <div>
         <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
       </div>
    </>
  )
}

export default Logout
