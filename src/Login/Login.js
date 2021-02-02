import { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../Auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const response = await auth.signin(email, password, () => {});
    // Does it make sense?
    if(response) {
      toast.error(response, {
        position: 'top-center'
      });
    }
  }

  useEffect(() => {
    if(auth.isLoggedIn()) {
      history.replace(state?.from || '/');
    }
    if(state?.register) {
      toast.success('Register complete! You can now log in.', {
        position: 'top-center',
      });
      state.register = null;
    }    
  });

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email" 
            name="email" 
            id="email"
            autoComplete="username"
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
            autoComplete="current-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Login</button>  
        </div>
        <ToastContainer />
      </form>
      <Link to='/register'><p>Register</p></Link>
    </div>
  );
}

export default Login;