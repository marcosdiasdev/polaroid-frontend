import { createContext, useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Private: the context; it'll be available via useAuth
const AuthContext = createContext();

// Public: Custom hook which will provide access to the auth context
function useAuth() {
  return useContext(AuthContext);
}

// Public: Provider Component which will wrap the application components
function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Private: Function for populating the context
// This function only will be used when creating the Provider
// The properties returned will be available via useAuth()
function useProvideAuth() {
  
  const getStoredUserData = () => {
    return JSON.parse(localStorage.getItem('user') || null);
  }
  
  const [user, setUser] = useState(getStoredUserData());

  useEffect(() => {
    refreshUserData();
  });

  const refreshUserData = () => {
    if(user !== null && isExpired(user.expiresIn)) {
      localStorage.removeItem('user');
      setUser(null);
    }
    // TODO: Add token refresh here
  }

  const isExpired = (expiration) => {
    return new Date(expiration) < new Date();
  }

  const isLoggedIn = () => {
    return user !== null && !isExpired(user.expiresIn);  
  }

  const signin = async (email, password) => {
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASEURL}/login`,options);
      if(response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        const responseData = await response.json();
        return responseData?.message || 'Unable to authenticate.';
      }      
    } catch(error) {
      return error.message;
    }
  }

  const signout = async () => {
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASEURL}/logout`,options);
      if(response.ok) {
        localStorage.removeItem('user');
        setUser(null);
      }      
    } catch (error) {
      return error.message;
    }
  }

  return {
    user,
    isLoggedIn,
    signin,
    signout
  };
}

// Public: private route component
function PrivateRoute({children, ...rest}) {
  const auth = useAuth();
  return (
    <Route {...rest} render={({location}) => {
      return auth.isLoggedIn()
      ? children 
      : <Redirect to={{ pathname: '/login', state: { from: location }  }} />
    }} />
  );
}

export { PrivateRoute, ProvideAuth, useAuth };