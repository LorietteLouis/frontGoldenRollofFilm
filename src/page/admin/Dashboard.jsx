import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import HeaderAdmin from "../../compoment/HeaderAdmin";
import Footer from "../../compoment/Footer";

const Dashboard = () =>{
    const navigate = useNavigate();

    useEffect(()=> {
        const jwt = Cookies.get("jwt");

        if (!jwt){
            navigate("/login");
        }
        const user = jwtDecode(jwt);

        if(user.data.role === 1){
            navigate("/");
        }
    }, []);

    return(
        <>
        <HeaderAdmin/>
        <div className="home">
          <h1>Home Administration</h1>
          <p>hello and welcome to this center!</p>
          <Link to="../admin/reviews"><button
            className="btn" 
            type="submit">Commentaire Publique
           </button></Link>
        </div>
        <Footer/>
      </> 
    );
};

export default Dashboard;
