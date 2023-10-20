//Navbar component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to={'/'} className="icon">Unsplash</Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`} id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/collection" className="coll_link">
            Collection
          </Link>
          <Link to="/" className="coll_link">
            Following
          </Link>
          <Link to="/" className="coll_link">
            Animals
          </Link>
          <Link to="/" className="coll_link">
            Nature
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
