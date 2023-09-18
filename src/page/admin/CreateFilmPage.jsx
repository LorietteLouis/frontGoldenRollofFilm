import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";
import jwtDecode from "jwt-decode";

const CreateFilmPage = () => {
    const navigate = useNavigate();
    const handleCreateFilm = async (e) => {
        e.preventDefault();

        const title_vf = e.target.title_vf.value
        const title_original =  e.target.title_original.value
        const years = e.target.years.value
        const synopsis = e.target.synopsis.value
        const countries = e.target.countries.value
        const genre = e.target.genre.value

        const filmData = {
            title_vf: title_vf,
            title_original: title_original,
            years: years ? parseInt(years):null,
            synopsis : synopsis,
            countries : countries,
            genre : genre,
        };

        const formData = new FormData();

        formData.append("image", e.target.image.files[0]);
        formData.append("data", JSON.stringify(filmData));



        const token = Cookies.get("jwt")
        
        const responseCreate = await fetch (`http://localhost:3042/api/films/withImg`,{
            method: "POST",
            body: formData,
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const responseCreateJs = await responseCreate.json();
        navigate("/admin/films")

        console.log(responseCreateJs);
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
            if (user.data.role === 2) {
                navigate("/admin/dashboard")
            }
      }, []);
    
    
    
        return (
            <>
            <HeaderAdmin/>
            <form onSubmit={handleCreateFilm} className="creatingPage">
            <div className="create forma">
                        <label htmlFor="title_vf">Titre en français</label>
                        <input type="text" name="title_vf"/>
                    </div>
                    <div className="create forma">
                        <label htmlFor="title_original">Titre Original</label>
                        <input type="text" name="title_original"/>
                    </div>
                    <div className="create forma">
                        <label htmlFor="years">Année</label>
                        <input type="number" name="years"/>
                    </div>
                    <div className="create forma">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea name="synopsis" rows="5" cols="100"></textarea>
                    </div>
                    <div className="create forma">
                        <label htmlFor="countries">Pays</label>
                        <input type="text" name="countries"/>
                    </div>
                    <div className="create forma">
                        <label htmlFor="genre">Genre</label>
                        <input type="text" name="genre"/>
                    </div>
                    <div className="create forma">
                        <label htmlFor="image">Poster</label>
                        <input type="file" name="image" />
                    </div>
                    <input type="submit" className="btn"/>
            </form>
            <Footer/>
            </>
        )
}
export default CreateFilmPage;