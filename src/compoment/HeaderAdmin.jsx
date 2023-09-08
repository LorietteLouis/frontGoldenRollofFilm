import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import logo from '../image/logo.png';


const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt");

    navigate("/");
  };

  const jwt = Cookies.get("jwt");
  const user = jwtDecode(jwt)
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const search = event.target.search.value;

    navigate(`/results?search=${search}`);
  };
    return (
      <header className="header-top">
        <img src={logo} className="Header-logo" alt="logo"/>
        <h1>Golden Roll of Film</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/admin/films">All Films</Link>
          </li>
          <li>
            <Link to="/admin/reviews">All Reviews</Link>
          </li>
          <li>
            <Link to="/admin/users">All Users</Link>
          </li>
          <li>
            <Link to="/admin/films/create">Create</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
              <a href="#" onClick={handleLogout}>Log Out</a>
          </li>
          <li>
            <p>Hello administrator {user.data.username}</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;