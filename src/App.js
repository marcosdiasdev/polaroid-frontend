import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Album from './Album/Album';
import Login from './Login/Login';
import PhotoUploader from './PhotoUploader/PhotoUploader';
import {ProvideAuth, PrivateRoute} from './Auth';

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/" exact>
              <Album></Album>
            </PrivateRoute>
            <PrivateRoute path="/photo-uploader" exact>
              <PhotoUploader></PhotoUploader>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;