import { Link } from "react-router-dom";
import "../css/Navbar.css"

function Navbar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">
                <h1 class="glow">FindFlix</h1>
            </Link>       
        </div>
        <div className="navbar-links">
            <Link to="/ " className="nav-link">Home</Link>
            <Link to="/favourites" className="nav-link">Favourites</Link>
            <Link to="/watch-later" className="nav-link">Watch Later</Link>
            <Link to="/search" className="nav-link">Search</Link>
        </div>
    </nav>
}

export default Navbar