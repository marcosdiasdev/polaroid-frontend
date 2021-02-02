import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProvideAuth, PrivateRoute } from './Auth';
import Navbar from './Navbar/Navbar';
import Album from './Album/Album';
import Login from './Login/Login';
import Register from './Register/Register';

import PhotoUploader from './PhotoUploader/PhotoUploader';

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/" exact>
              <Navbar></Navbar>
              <Album></Album>
            </PrivateRoute>
            <PrivateRoute path="/photo-uploader" exact>
              <Navbar></Navbar>
              <PhotoUploader></PhotoUploader>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;