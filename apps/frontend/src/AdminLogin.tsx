import React from 'react';
import './styles/Admin.scss';
import { IoChevronBackOutline } from 'react-icons/io5';


function AdminLogin() {
    
  return (
    <div className="background">

        <a href='/'>
            <p className='backBtn'>Home</p>
        </a>

      <div className='loginBox'> 
        <h1 className='words'>Admin Portal</h1>
        <div className="inputContainer">
            <input className="inputBox" placeholder="Enter password" type="password" />
            <a href="/admin-page">
                <button className="enterButton">Enter</button>
            </a>
        </div>
      </div>

    </div>
    
  )
}

export default AdminLogin