import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";

const AllFilmPageAdmin = () => {
    const [films, setFilms] = useState([]);
    const [deleteFilmCritic, setDeleteFilmCritic] = useState(null)

    const navigate = useNavigate();

    const fetchFilm = async () => {
        const response = await fetch("http://localhost:3042/api/films/withImg", {
            method: "GET"
        });
        const responseJs = await response.json();

        setFilms(responseJs.data);
    };

    useEffect(() => {
        const jwt = Cookies.get("jwt")

        if (!jwt){
            navigate("/login")
        }

        const user = jwtDecode(jwt);
        
        if (user.data.role === 1) {
            navigate("/")
        }
    fetchFilm()},[deleteFilmCritic])

    const handleDeleteFilm = async (filmId) => {
        const token = Cookies.get("jwt")
        const responseDelete = await fetch(`http://localhost:3042/api/films/${filmId}`,{
          method:"DELETE",
          headers:{
            Authorization: `Bearer ${token}`,
          }  
        })

        const responseDeleteJs = await responseDelete.json();
        setDeleteFilmCritic(responseDeleteJs.message);
    }

    return (
        <>
        <HeaderAdmin/>
        <h1> Liste des films </h1>
        {deleteFilmCritic && <p>{deleteFilmCritic}</p>}
        {films.map((film) => (
            <div key={film.id} className="films">
                <h3>{film.title_vf}</h3>
                <p>{film.years}</p>
                {film.picture && <img src={film.picture} alt={film.title_vf} />}
                <button onClick={() => handleDeleteFilm(film.id)}>Supprimer</button>
                <Link to= {`/admin/films/${film.id}/update`}>Uptdate</Link>
            </div>
        ))}
        <Footer/>
        </>
    )
}
export default AllFilmPageAdmin