import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  const handleHomeClick = () => {
    window.location.href = "/"; // This will force the page to reload and go to the Home page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* "Movies4ALL" clickable logo */}
        <span className="nav-logo" onClick={handleHomeClick}>
          Movies4ALL
        </span>
      </div>
      <div className="navbar-links">
        {/* Home link - clickable */}
        <span className="nav-link home-link" onClick={handleHomeClick}>
          Home
        </span>
        {/* Favourites link - React Router Link */}
        <Link to="/favourites" className="nav-link favourites-link">
          Favourites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
