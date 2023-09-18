import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useState,useEffect } from "react"
import HeaderPublic from "../../compoment/HeaderPublic";
import Footer from "../../compoment/Footer";
import { useParams } from "react-router-dom";
import ReviewByDocFilm from "../../compoment/ReviewByDocFilm";
import banner from '../../logoAndIcons/movie-theater-background-1920-x-1080-0rlqfkw46krlqijm.jpg'

const DocFilmPage = () => {
    const {id} = useParams();
    const [docFilms, setDocFilms] = useState(null);
    const [review, setReview] = useState([]);

    let isUserConnected = false;
   
    
    const jwt = Cookies.get("jwt");

    if (jwt) {
        const decodedJwt = jwtDecode(jwt);
        const role = decodedJwt.data.role;

        if (role === 1 || role === 2 || role === 3) {
            isUserConnected = true;
        }
    }
    

    const fetchDocFilms = async () => {
        const response = await fetch(`http://localhost:3042/api/films/${id}`, {
            method:"GET"
        });
        const responseJs = await response.json();

        setDocFilms(responseJs.data);
    };

    useEffect(() => {fetchDocFilms()},[]);

    const handleCreateReview = async (e,id) =>{
    e.preventDefault()

    const content = e.target.content.value;
    const rating = e.target.rating.value;

    const reviewCreateData = {
        content: content,
        rating: parseInt(rating),
    }
    const jwt = Cookies.get("jwt")

    const responseReview = await fetch(`http://localhost:3042/api/withReview`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(reviewCreateData),
    })
    const responseReviewJs = await responseReview.json();
    setReview(responseReviewJs.data);
    console.log(responseReviewJs);

}

useEffect(() => {fetchDocFilms()},[]);

return(
    <>
        <HeaderPublic/>
        <img src={banner} className="banner" alt="banner cinema room"/>
        <section className="docFilm-section">
        {docFilms && (
          <>
           {docFilms.picture && <img src={docFilms.picture} alt={docFilms.title_vf} className="poster"/>}
           <div className="container-docFilm">
                <h1>{docFilms.title_vf}</h1>
                <h3>{docFilms.title_original}</h3>
                <h3>{docFilms.genre}</h3>
                <p><strong>Année de sortie :</strong>{docFilms.years}</p>
                <p><strong>synopsis :</strong>{docFilms.synopsis}</p>
            </div>
          </>
        )}
        
            </section>
        {}
        <div review-critic>
        {isUserConnected && (
        <form className="review" onSubmit={(event) => handleCreateReview(event, docFilms.id)}>
          <label htmlFor="content"><h2>Zone de critique</h2></label>
          <textarea name="content" rows="15" cols="100"></textarea>
          
          <label htmlFor="rating"className="rating">Votre note </label>
          <input type="number" className="rating" name="rating" min="0" max="100" />

          <button type="submit"className="btn rating">Envoyer</button>
        
          <ReviewByDocFilm/>
            
           
        </form>
        )}
        </div>
        
        
        <Footer/>
    </>
)}

export default DocFilmPage;