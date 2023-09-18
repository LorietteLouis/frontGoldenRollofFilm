import { Link } from 'react-router-dom'
import logo from '../logoAndIcons/logo.png'


const Footer = () => {
    return (
        <footer className = "Footer-Site">
            <img src={logo} className="Footer-logo" alt="logo"/>
            <nav>
                <ul>
                    <li>
                    <Link to= {`/contact`}>Contact</Link>
                    </li>
                    <li>
                        <p>© Golden Roll of Film</p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer