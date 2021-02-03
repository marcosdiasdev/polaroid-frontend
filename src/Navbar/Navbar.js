import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Auth';
import './Navbar.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const auth = useAuth();
  const history = useHistory();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await auth.signout();
    history.replace('/login');
    } catch(error) {
      toast.error(error.message, {
        position: 'top-center'
      })
    }
  }

  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/">Photos</Link>
        </li>
        <li>
          <Link to="/photo-uploader">Upload</Link>
        </li>
        <li>
        { auth.isLoggedIn()
          ? <Link to="/" onClick={handleLogout}>Logout</Link>
          : <Link to="/login">Login</Link> }
        </li>
      </ul>
      <ToastContainer/>
    </nav>
  );
}

export default Navbar;