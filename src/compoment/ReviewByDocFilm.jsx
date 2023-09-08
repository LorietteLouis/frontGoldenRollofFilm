
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ReviewByDocFilm = () => {
    const [reviews, setReviews] = useState([]);

    const navigate = useNavigate();

    const fetchReview = async () => {
        const response = await fetch("http://localhost:3042/api/reviews",{
            method: "GET"
        });
        const responseJs = await response.json();
        
        setReviews(responseJs.data);

        
    };
    useEffect(() =>{fetchReview()},[])

        return(
            <>
            <h1>Liste des critiques</h1>
            {reviews.map((review) =>(
                <div key={review.id} className="reviews">       
                    <p>{review.content}</p>
                    <p>{review.rating}</p>
                </div>
            ))}

            </>
        )
    }

export default ReviewByDocFilm