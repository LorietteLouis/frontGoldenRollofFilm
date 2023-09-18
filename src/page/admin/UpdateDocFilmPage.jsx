import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";

const UpdateDocFilmPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [updateFilm, setUpdateFilm] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [indexTime, setIndexTime] = useState(5);

    const fetchFilm = async () =>{
        const responseFilm = await fetch (`http://localhost:3042/api/films/${id}`)
        const responseFilmJs = await responseFilm.json();

        setUpdateFilm(responseFilmJs.data);
    };

    const handleUpdateFilm = async (e) =>{
        const title_vf = e.target.title_vf.value
        const title_original =  e.target.title_original.value
        const years = e.target.years.value
        const synopsis = e.target.synopsis.value
        const countries = e.target.countries.value
        const genre = e.target.genre.value

        const filmData = {
            title_vf : title_vf,
            title_original : title_original,
            years : years ? parseInt(years) : null,
            synopsis: synopsis,
            countries : countries,
            genre : genre,
        };

        const formData = new FormData();

        formData.append("picture", e.target.picture.files[0]);
        formData.append("data", JSON.stringify(filmData));

        const token = Cookies.get("jwt")

        const requestOptions = {
            method: "PUT",
            headers: {
            //   "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          };

        const responseUpdate = await fetch (`http://localhost:3042/api/films/${id}`,requestOptions)

        if (responseUpdate.status === 200) {
            setInterval(() => {
                setIndexTime((indexTime) => indexTime - 1);
              }, 1000);
        
              setIsUpdate(true);
        
              setTimeout(() => {
                navigate("/admin/films");
              }, 5000);
            }
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
            if (user.data.role === 2){
                navigate("/admin/dashboard")
            }
        fetchFilm()},[])

            return (
                <>
                <HeaderAdmin/>
                {isUpdate && (
                    <h3 className ="confirm-message">
                    Le film à bien était modifié, redirection vers le All Films dans : {indexTime} secondes.
                    </h3>
                )}
                <form onSubmit={handleUpdateFilm} className="updatingPage">
            <div className="update forma">
                        <label htmlFor="title_vf">Titre en français</label>
                        <input type="text" name="title_vf" defaultValue={updateFilm && updateFilm.title_vf}/>
                    </div>
                    <div className="update forma">
                        <label htmlFor="title_original">Titre Original</label>
                        <input type="text" name="title_original" defaultValue={updateFilm && updateFilm.title_original}/>
                    </div>
                    <div className="update forma">
                        <label htmlFor="years">Année</label>
                        <input type="number" name="years" defaultValue={updateFilm && updateFilm.years}/>
                    </div>
                    <div className="update forma">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea name="synopsis" rows="4" cols="50" defaultValue={updateFilm && updateFilm.synopsis}></textarea>
                    </div>
                    <div className="update forma">
                        <label htmlFor="countries">Pays</label>
                        <input type="text" name="countries" defaultValue={updateFilm && updateFilm.countries}/>
                    </div>
                    <div className="update forma">
                        <label htmlFor="genre">Genre</label>
                        <input type="text" name="genre" defaultValue={updateFilm && updateFilm.genre}/>
                    </div>
                    <div className="update forma">
                        <label htmlFor="picture">Poster</label>
                        <input type="file" name="picture" defaultValue={updateFilm && updateFilm.picture}/>
                    </div>
                    <input type="submit" className="btn"/>
            </form>
                <Footer/>
                </>
            )
}
export default UpdateDocFilmPage