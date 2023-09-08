import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import HeaderAdmin from "../../compoment/HeaderAdmin";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Footer from "../../compoment/Footer";


const UpdateUserPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [user, setUser]=useState(null);

    const fetchUser = async () => {
        const responseUser = await fetch (`http://localhost:3042/api/users/${id}`)
        const responseUserJs = await responseUser.json();

        setUser(responseUserJs.data)
    }

    const handleUpdateUser = async (e) => {
        const username = e.target.username.value
        const email = e.target.email.value

        const userData = {
            username : username,
            email: email,
        };

        const token = Cookies.get("jwt")

        const responseUpdate = await fetch (`http://localhost:3042/api/users/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (responseUpdate.status === 200) {
            navigate("/admin/users");
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
        fetchUser();
    },[]);

    return(
    <div>
        <>
        <HeaderAdmin/>
        <form onSubmit={handleUpdateUser} className="updatingPage">
            <div className="update forma">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" defaultValue={user && user.username}/>
            </div>
            <div className="update forma">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" defaultValue={user && user.username}/>
            </div>
            <input type="submit" className="btn gradient-btn" />
        </form>
        <Footer/>
        </>
    </div>
    )
}
export default UpdateUserPage