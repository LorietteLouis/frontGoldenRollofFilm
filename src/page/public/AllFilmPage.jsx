import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react"
import { Link} from "react-router-dom";
import HeaderPublic from "../../compoment/HeaderPublic";
import Footer from "../../compoment/Footer";


const AllFilmPage = () => {
    const [films, setFilms] = useState([]);

    let isUserConnected = false;

    const jwt = Cookies.get("jwt");

    if (jwt) {
        const decodeJwt = jwtDecode(jwt)
        const role = decodeJwt.data.role;

        if(role === 1 || role === 2 || role === 3){
            isUserConnected = true;
        }
    }

    const fetchFilms = async () => {
        const response = await fetch("http://localhost:3042/api/films", {
            method:"GET"
        });
        const responseJs = await response.json();

        setFilms(responseJs.data);
    };

    useEffect(() => {fetchFilms()}, []);
return(
    <>
    <HeaderPublic/>
    <div>
        <h1>La Liste des films</h1>
        {films.map((film) =>(
            <div key = {film.id}>
                {film.picture && <img src={film.picture} alt={film.title_vf} />}
                <h3>{film.title_vf}</h3>

                <Link className="btn btn-gradient" to= {`/films/${film.id}`}>Regarder</Link>
            </div>
        ))}
    </div>
    <Footer/>
    </>
)
}

export default AllFilmPage