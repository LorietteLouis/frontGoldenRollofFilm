
import copper from "../logoAndIcons/bobine_cuivre.png";
import gold from "../logoAndIcons/bobine_or.png";
import silver from "../logoAndIcons/bobine_argent.png";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

const IconByRating =() =>{
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
    <div>
         {reviews.rating <= 33 &&
             <img className="icon" src={copper} alt="cuivre" />
            }
        {reviews.rating > 33
            && reviews.rating <= 66 &&
             <img className="icon" src={silver} alt="argent"/>
            }
            
            {reviews.rating >66 &&
            <img className="icon" src={gold} alt="or" />
            }
    </div>
    )
};
export default IconByRating