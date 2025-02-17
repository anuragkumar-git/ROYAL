import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark ">
        <Link class="nav-link navbar-brand" to="/">
          NEXORA
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link class="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link class="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link class="nav-link" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
