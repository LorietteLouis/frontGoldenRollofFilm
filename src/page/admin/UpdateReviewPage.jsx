import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import HeaderAdmin from "../../compoment/HeaderAdmin";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Footer from "../../compoment/Footer";


const UpdateReviewPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [review, setReview]=useState(null);

    const fetchReview = async () => {
        const responseReview = await fetch (`http://localhost:3042/api/reviews/${id}`)
        const responseReviewJs = await responseReview.json();

        setReview(responseReviewJs.data)
    }

    const handleUpdateReview = async (e) => {
        const content = e.target.content.value
        const rating = e.target.rating.value

        const reviewData = {
            content : content,
            rating : rating,
        };

        const token = Cookies.get("jwt")

        const responseUpdate = await fetch (`http://localhost:3042/api/reviews/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reviewData),
        });

        if (responseUpdate.status === 200) {
            navigate("/admin/reviews");
        }
    };

    useEffect(() => {
        const jwt = Cookies.get("jwt");

        if (!jwt) {
            navigate("/login");
        }

        const user = jwtDecode(jwt);

        if (user.data.role === 1){
            navigate("/")
        }
       
        fetchReview();
    },[]);

    return(
    <div>
        <>
        <HeaderAdmin/>
        <form onSubmit={handleUpdateReview} className="updatingPage">
            <div className="update forma">
                <label htmlFor="content">Content</label>
                <textarea type="content" name="content" rows="10" cols="150" defaultValue={review && review.content}/>
            </div>
            <div className="update forma">
                <label htmlFor="rating">Rating</label>
                <input type="number" name="rating" min="0" max="100" defaultValue={review && review.rating}/>
            </div>
            <input type="submit" className="btn gradient-btn" />
        </form>
        <Footer/>
        </>
    </div>
    )
}
export default UpdateReviewPage