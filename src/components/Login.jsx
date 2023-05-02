import axios from 'axios';
import { useState } from 'react';



export function Login() {
  const [userLogged, setUserLogged] =useState(null);
  const [message, setMessage]=useState("")



  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = new FormData(event.target)

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username: fields.get('username'),
        password: fields.get('password'),
      });
      console.log(response.data); 
      const userId = response.data.userId
      const username = response.data.username
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      setUserLogged(userId)
      setMessage(response.data.message)
      userId? window.location.href = './movies' : ""

    } catch (error) {
      console.log(error);
    }
  };

  console.log("El usuario logeado tiene el id " + localStorage.getItem('userId'))
    return (
      <div className='container'>
        <div className='login-box'>
          <h4 className='login-title'>Login</h4>
          {message!=="" && <p style={{color: !userLogged?"red":"green"}}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <label id='user-name-label' htmlFor='username'>Username</label>
            <input className='form-control me-2' name='username' type='text' placeholder='User' id='user-name' />
            <label htmlFor='password'>Password</label>
            <input className='form-control me-2' name='password' type='password' placeholder='Password' id='password' />
            {/* <label htmlFor='remember'>Recuérdame */}
              {/* <input type='checkbox' name='remember' id='remember' /> */}
            {/* </label> */}
            <button className='btn btn-outline-success' type='submit'>Login</button>
          </form>
        </div>
      </div>
    )
  }

  