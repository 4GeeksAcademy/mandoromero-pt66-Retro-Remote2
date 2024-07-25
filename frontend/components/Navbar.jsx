import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w92'; // Smaller image size for suggestions

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/search`, { params: { query } });
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.length > 2) {
      try {
        const response = await axios.get(`${apiBaseUrl}/search`, { params: { query } });
        setResults(response.data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name);
    setResults([suggestion]);
    setSuggestions([]);
  };

  useEffect(() => {
    const dropdown = dropdownRef.current;

    const showDropdown = () => console.log('Dropdown is shown');
    const hideDropdown = () => console.log('Dropdown is hidden');

    if (dropdown) {
      dropdown.addEventListener('show.bs.dropdown', showDropdown);
      dropdown.addEventListener('hide.bs.dropdown', hideDropdown);
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener('show.bs.dropdown', showDropdown);
        dropdown.removeEventListener('hide.bs.dropdown', hideDropdown);
      }
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Welcome to:____________</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <form className="d-flex me-auto" onSubmit={handleSearch}>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={handleInputChange}
                  style={{ width: '400px' }}
                />
                {suggestions.length > 0 && (
                  <ul className="list-group position-absolute" style={{ width: '400px', zIndex: 1000 }}>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <img
                          src={`${imageBaseUrl}${suggestion.poster_path}`}
                          alt={suggestion.title || suggestion.name}
                          className="me-2"
                          style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                        />
                        <span>{suggestion.title || suggestion.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" ref={dropdownRef}>
                  Menu
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="#">Sign in</a></li>
                  <li><a className="dropdown-item" href="#">Favorites</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {results.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt={item.title || item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.title || item.name}</h5>
                  <p className="card-text">{item.release_date || item.first_air_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
