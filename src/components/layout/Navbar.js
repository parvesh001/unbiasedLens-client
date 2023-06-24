import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
import styles from "./Navbar.module.scss";
import Alert from "../../UI/Alert";

export default function Navbar() {
  const loggedIn = true;
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:8080/api/v1/category");
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message);
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError({ scenario: "error", message: err.message });
      }
    })();
  }, []);

  const showedCategories = [];
  const moreCategories = [];

  for (let i = 0; i < 4; i++) {
    if (categories[i]) {
      showedCategories.push(categories[i]);
    }
  }

  for (let i = 4; i < categories.length; i++) {
    moreCategories.push(categories[i]);
  }

  const navLinks = showedCategories.map((category, index) => {
    return (
      <li className="nav-item" key={category._id}>
        <NavLink
          className={(navData) =>
            navData.isActive ? `nav-link ${styles.active}` : "nav-link"
          }
          to={`/blogs/category/${category.slug}`}
        >
          {category.name}
        </NavLink>
      </li>
    );
  });

  const moreNavLinks = moreCategories.map((category) => {
    return (
      <li key={category._id}>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? `dropdown-item ${styles.active}`
              : "dropdown-item"
          }
          to={`/blogs/category/${category.slug}`}
        >
          {category.name}
        </NavLink>
      </li>
    );
  });

  return (
    <>
      {error && <Alert scenario={error.scenario} message={error.message} />}
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/brand.png"
              className={styles.brandImage}
              alt="Unbiased Lens"
            />
          </a>
          <button
            className={`navbar-toggler ${styles["toggler"]}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <RiMenu4Line className="text-primary fs-2" />
          </button>
          <div
            className="collapse navbar-collapse mt-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-md-flex justify-content-end w-100 gap-md-2">
              {navLinks}
              <li className="nav-item dropdown mt-2">
                <div
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </div>
                <ul className="dropdown-menu top-50">{moreNavLinks}</ul>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary mx-md-3 mt-3 mt-md-0">
                  Create
                </button>
              </li>
              {loggedIn && (
                <li
                  className="nav-item dropdown dropstart mt-3 mt-md-0"
                  style={{ content: "none" }}
                >
                  <div
                    className={`dropdown-toggle d-flex ${styles.dropdownToggle}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className={styles.profile}>
                      <img src="/img/user1.jpg" className="w-100" alt="user" />
                    </div>
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {!loggedIn && (
                <li className="nav-item">
                  <button className="btn btn-primary my-3 my-md-0">
                    Register
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
