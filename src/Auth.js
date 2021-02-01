import {createContext, useContext, useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getLocalUserData());
  }, []);

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

    const response = await fetch(`${process.env.REACT_APP_API_BASEURL}/login`,options);
    if(response.ok) {
      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
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

    const response = await fetch(`${process.env.REACT_APP_API_BASEURL}/logout`,options);
    if(response.ok) {
      localStorage.removeItem('user');
      setUser(null);
    }
  }

  // const x = () => {
  //   let userData = JSON.parse(localStorage.getItem('user') || null);
  //   if(isExpired(userData.expiresIn)) {
  //     localStorage.removeItem('user');
  //     userData = null;
  //   }
  //   return userData;
  // }

  const getLocalUserData = () => {
    return JSON.parse(localStorage.getItem('user') || null);
  }

  const isExpired = (expiration) => {
    return new Date(expiration) < new Date();
  }

  // Checks if the user data exits in local storage and if it's not expired
  const isLoggedIn = () => {
    const userData = getLocalUserData();
    return userData !== null && !isExpired(userData.expiresIn);
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
      : <Redirect to={{
        pathname: '/login',
        state: { from: location }
      }} />
    }} />
  );
}

export { PrivateRoute, ProvideAuth, useAuth };