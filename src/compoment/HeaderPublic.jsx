import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom"
import logo from '../image/logo.png'

const HeaderPublic = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      Cookies.remove("jwt");
  
      navigate("/")
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const search = event.target.search.value;
  
      navigate(`/result?search=${search}`);
    };
      return (
        <header className="header-top">
          <img src={logo} className="Header-logo" alt="logo"/>
          <h1>Golden Roll  of Film</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/films">Galerie</Link>
            </li>
            
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
            <a href="#" onClick={handleLogout}>Déconnexion</a>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleSubmit}>
          <input type="text" name="search" placeholder="Search ..." />
          <button type="submit">Rechercher</button>
        </form>
      </header>
    );
  };
  
  export default HeaderPublic;