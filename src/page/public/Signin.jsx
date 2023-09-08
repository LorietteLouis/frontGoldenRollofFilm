import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"

const SignupPage = () => {
    const navigate = useNavigate();
    const handleCreateUser = async(e)=>{
        e.preventDefault();

        const username = e.target.username.value
        const password = e.target.password.value
        const email = e.target.email.value

        const userData = {
            username: username,
            password: password,
            email: email,
            roleId: 1,
        };
        const token = Cookies.get("jwt")

        const responseCreate = await fetch (`http://localhost:3042/api/users/signup`,{
            method: "POST",
            body: JSON.stringify(userData),
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const responseCreateJs = await responseCreate.json();
        navigate ("/")
    };
        return(
            <>
            <form onSubmit={handleCreateUser} className="creatingPage">
            <div className="signup forma">
                <label htmlFor="username">Username</label>
                <input type="text" name="username"/>
            </div>
            <div className="signup forma">
                <label htmlFor="email">e-mail</label>
                <input type="email" name="email"/>
            </div>
            <div className="signup forma">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
            </div>

            <input type="submit" />
            </form>
            </>
        )
}
export default SignupPage;