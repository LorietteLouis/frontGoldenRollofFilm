import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";

const CreateFilmPage = () => {
    const navigate = useNavigate();
    const handleCreateFilm = async (e) => {
        e.preventDefault();

        const title_vf = e.target.title_vf.value
        const title_original =  e.target.title_original.value
        const years = e.target.years.value
        const synopsis = e.target.synopsis.value
        const countries = e.target.countries.value

        const filmData = {
            title_vf: title_vf,
            title_original: title_original,
            years: years ? parseInt(years):null,
            synopsis : synopsis,
            countries : countries,
        };

        const formData = new FormData();

        formData.append("image", e.target.image.files[0]);
        formData.append("data", JSON.stringify(filmData));


        const token = Cookies.get("jwt")

        const responseCreate = await fetch (`http://localhost:3042/api/films/withImg`,{
            method: "POST",
            body: JSON.stringify(filmData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const responseCreateJs = await responseCreate.json();
        navigate("/admin/films")
    };
    useEffect(() =>{
        const jwt = Cookies.get("jwt")
        if (!jwt){
            navigate("/login");
        }
        const user = jwtDecode(jwt)

        if (user.data.role === 1){
            navigate("/")
        }
    }, [])
    
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
                        <textarea name="synopsis" rows="4" cols="50"></textarea>
                    </div>
                    <div className="create forma">
                        <label htmlFor="countries">Pays</label>
                        <input type="text" name="countries"/>
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