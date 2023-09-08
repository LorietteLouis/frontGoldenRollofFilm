import Footer from "../../compoment/Footer";
import HeaderPublic from "../../compoment/HeaderPublic"
import { Link } from "react-router-dom";

const HomePage = () => {

    return(
        <>
        <HeaderPublic/>
        <div className="home">
            <h1>Golden Roll of Film</h1>
            <p>Bonjour et bienvenu sur notre site, ce site est un site de critique cinéma. Toute les informations et critiques sont libres d'accès autant pour les visiteurs de site que les utilisateurs. Cependant si vous voulez écrire une critique sur un film certain points sont à prendre en compte.</p>
            <p>Tout d'abord il est important pour vous de vous inscrire sur notre site. Seul les utilisateurs sont autorisé à donner des critiques.</p>
            <Link to= {`/signup`}>Inscription</Link>
            <p>Par la suite il faut suivre certaines règles d'inscription :</p>
            <ul>
                <ol>Les critiques doivent être complête, il ne doit pas y avoir un avis généralisé. Expliquez sur certains point les faiblesses et les points fort du films.</ol>
                <ol>Soyez constructif, il n'y a rien de plus désagréable qu'une suite de phrase qui ne soit organisé.</ol>
                <ol>Faites attention à votre orthographe. Nous ne somme pas une dictature sur l'orthographe et comprenons les difficultés des uns des autres pour l'écriture. Mais moins il y aura de faute, plus la lecture sera plaisante.</ol>
                <ol>Donnez une note cohérente à votre critique. Si votre critique est bonne donnez une bonne note, dans le cas contraire donnez une mauvaise.</ol>
                <ol>Enfin, soyez courtoit et respectueux. Car n'oublez jamais qu'un film c'est une guerre qui ne se termine pour la plupart jamais.</ol>
            </ul>
        </div>
        <Footer/>
        </>
    )
}
export default HomePage;