import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Auth';
import './Navbar.css';

function Navbar() {
  const auth = useAuth();
  const history = useHistory();

  async function handleLogout(e) {
    e.preventDefault();
    await auth.signout();
    history.replace('/login');
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
    </nav>
  );
}

export default Navbar;