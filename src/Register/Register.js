import { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../Auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useHistory();
  const {state} = useLocation();
  const auth = useAuth();

  async function handleRegister(e) {
    e.preventDefault();
    
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, lastname, birth, email, password
      })
    };

    const response = await fetch(`${process.env.REACT_APP_API_BASEURL}/register`, options);
    if(response.ok) {
      history.replace('/login', { register: true });
    } else {
      const responseContent = await response.json();
      toast.error(responseContent.details[0].message, {
        position: 'top-center',
      });
    }
  }

  useEffect(() => {
    if(auth.isLoggedIn()) {
      history.replace(state?.from || '/');
    }
  });

  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
      <div>
          <label htmlFor="name">Name</label>
          <input
            type="text" 
            name="name" 
            id="name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>        
        <div>
          <label htmlFor="lastname">Last name</label>
          <input
            type="text" 
            name="lastname" 
            id="lastname" 
            value={lastname} 
            onChange={e => setLastname(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="birth">Birth</label>
          <input
            type="date" 
            name="birth" 
            id="birth" 
            value={birth} 
            onChange={e => setBirth(e.target.value)} 
          />
        </div>        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Register</button>  
        </div> 
        <ToastContainer />
      </form>
      <Link to='/login'><p>Login</p></Link>
    </div>
  );
}

export default Register;