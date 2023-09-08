import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";

const AllUserPage = () => {
    const [users, setUsers] = useState([]);
    const [deleteUser, setDeleteUser] = useState(null)

    const navigate = useNavigate();

    const fetchUser = async () => {
        const response = await fetch("http://localhost:3042/api/users", {
            method: "GET"
        });
        const responseJs = await response.json();

        setUsers(responseJs.data);
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
    fetchUser()},[deleteUser])

    const handleDeleteUser = async (userId) => {
        const token = Cookies.get("jwt")
        const  responseDelete = await fetch (`http://localhost:3042/api/users/${userId}`,{
            method:"DELETE",
            headers:{
              Authorization: `Bearer ${token}`,
            }  
        })

        const responseDeleteJs = await responseDelete.json();
        setDeleteUser(responseDeleteJs.message);
    }

    return(
        <>
        <HeaderAdmin/>
        <h1> Liste des Utilisateurs </h1>
        {deleteUser && <p>{deleteUser}</p>}
        {users.map((user) => (
            <div key={user.id} className="users">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                <Link to= {`/admin/users/${user.id}/update`}>Uptdate</Link>
            </div>
        ))}
        <Footer/>
        </>
    )
}
export default AllUserPage