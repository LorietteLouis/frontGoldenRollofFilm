
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import IconByRating from "./IconByRating";



const ReviewByDocFilm = () => {
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);

    
    

    const fetchReview = async () => {
        const response = await fetch(`http://localhost:3042/api/reviews/${id}`,{
            method: "GET"
        });
        const responseJs = await response.json();
        
        setReviews(responseJs.data);

        
    };
    useEffect(() =>{fetchReview()},[])

        return(
            
            <div className="title-critic">
            <h1>Liste des critiques</h1>
            
            {reviews && (
                <div key={reviews.id} className="reviews">      
                    <p>{reviews.content}</p>
                    <div className="rating">
                    <p>La Note : {reviews.rating}</p>
                    
                    </div>

                    
                </div>
                )}
                <IconByRating/>
            


            </div>
        )
    }

export default ReviewByDocFilm