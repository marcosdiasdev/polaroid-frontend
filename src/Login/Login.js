import { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../Auth';

function Login() {

  // The PrivateRoute Component sent us the location where the user came from
  // It was sent via state prop and can be accessed via useLocation
  // You can use <Redirect> or history to redirect the user
  // // if(false) return <Redirect to={state?.from || '/'} />;
  // if(true) history.replace(state?.from || '/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const {state} = useLocation();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    await auth.signin(email, password);
    if(auth.isLoggedIn()) {
      history.replace(state?.from || '/');
    }
  }

  if(auth.isLoggedIn()) 
    return <Redirect to="/"></Redirect>

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text" 
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
        <button>Login</button>  
      </div> 
    </form>
  );
}

export default Login;