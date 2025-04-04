import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
                <Link to="MoviesWebsite/">Movies4ALL</Link>
            </div>
      <div className="navbar-links">
        {/* Home link - clickable */}
        <Link to="MoviesWebsite/" className="nav-link home-link">
          Home
        </Link>
        {/* Favourites link - React Router Link */}
        <Link to="/favourites" className="nav-link favourites-link">
          Favourites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
