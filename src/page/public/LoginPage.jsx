import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import HeaderPublic from "../../compoment/HeaderPublic";

const LoginPage = () => {
    const navigate = useNavigate()
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const loginResponse = await fetch("http://localhost:3042/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, password }),
    });

    
    if (loginResponse.status === 200) {
       
      const loginData = await loginResponse.json();

     
      const jwt = loginData.data;

      
      Cookies.set("jwt", jwt);

      const user = jwtDecode(jwt)
      
      if (user.data.role === 3 || user.data.role === 2){
        navigate("/admin/dashboard")
      }else{
        navigate("/")
      }
      }

      navigate("/admin/dashboard");
    }
  

  return (
    <>
    <HeaderPublic/>
    <form onSubmit={handleLoginSubmit}className="login">
      <div className="login forma">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
      </div>

      <div className="login forma">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>

      <input type="submit" className="login btn gradient-btn"/>
    </form>
    </>
  );
};

export default LoginPage;