import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";

const ReviewAdminPage = () => {
    const [reviews, setReviews] = useState([]);
    const [deleteReview, setDeleteReview] =  useState(null)

    const navigate = useNavigate();

    const fetchReview = async () => {
        const response = await fetch("http://localhost:3042/api/reviews",{
            method: "GET"
        });
        const responseJs = await response.json();
        
        setReviews(responseJs.data);

    };

    useEffect(() =>{
        const jwt = Cookies.get("jwt")

        if(!jwt){
            navigate("/login")
        }

        const user = jwtDecode(jwt);
        if (user.data.role === 1){
            navigate("/")
        }
        fetchReview()},[deleteReview])

        const handleDeleteReview = async (reviewId) => {
            const token = Cookies.get("jwt")
            const responseDelete = await fetch(`http://localhost:3042/api/reviews/${reviewId}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })

            const responseDeleteJs = await responseDelete.json();
            setDeleteReview(responseDeleteJs.message);
        }

        return(
            <>
            <HeaderAdmin/>
            <h1>Liste des critiques</h1>
            {deleteReview && <p>{deleteReview}</p>}
            {reviews.map((review) =>(
                <div key={review.id} className="reviews">
                    <p>{review.content}</p>
                    <p>by {review.UserId}</p>
                    <p>for {review.FilmId}</p>
                    <button className="btn delete-btn" onClick={() => handleDeleteReview(review.id)}>Supprimer</button>
                <Link to= {`/admin/reviews/${review.id}/update`}>Uptdate</Link>
                </div>
            ))}
            <Footer/>
            </>
        )
    }

export default ReviewAdminPage
