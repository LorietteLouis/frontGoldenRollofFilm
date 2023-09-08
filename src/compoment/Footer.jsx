import logo from '../image/logo.png'

const Footer = () => {
    return (
        <footer className = "Footer-Site">
            <img src={logo} className="Footer-logo" alt="logo"/>
            <nav>
                <ul>
                    <li>
                        <p>© Copyright SioulCompany</p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer