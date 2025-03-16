import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/SearchResultsPage.css";
import { Link } from "react-router-dom";

const SearchResultsPage = () => {
  const [deals, setDeals] = useState([
    {
      id: 1,
      title: "🍕 30% OFF on All Pizzas",
      vendor: "Pizza Corner",
      distance: "1.2 km",
      image:
        "https://cdn.dribbble.com/userupload/29769579/file/original-dcb98ce800f0dff04b54930e780c1493.png?resize=400x0",
    },
    {
      id: 2,
      title: "☕ Buy 1 Get 1 Free Coffee",
      vendor: "Brew & Bean",
      distance: "800 m",
      image:
        "https://cdn.dribbble.com/userupload/29769579/file/original-dcb98ce800f0dff04b54930e780c1493.png?resize=400x0",
    },
    {
      id: 3,
      title: "🍔 Flat 25% OFF on Burgers",
      vendor: "Burger Hub",
      distance: "2.5 km",
      image:
        "https://cdn.dribbble.com/userupload/29769579/file/original-dcb98ce800f0dff04b54930e780c1493.png?resize=400x0",
    },
    {
      id: 4,
      title: "🍩 15% OFF on All Desserts",
      vendor: "Sweet Treats",
      distance: "1.0 km",
      image:
        "https://cdn.dribbble.com/userupload/29769579/file/original-dcb98ce800f0dff04b54930e780c1493.png?resize=400x0",
    },
  ]);

  const [filters, setFilters] = useState({
    category: "",
    distance: "All",
    priceRange: "All",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="search-results-page">
      {/* 🔍 Search Bar */}
      <header className="search-header bg-dark text-white p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search deals, restaurants..."
          />
          <button className="btn btn-primary ms-2">Search</button>
          <button className="btn btn-outline-light ms-2">📍 View on Map</button>
        </div>
      </header>

      <main className="container my-4">
        {/* 📊 Filters */}
        <section className="filters-section mb-4">
          <h5>Filter Deals</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="fast-food">Fast Food</option>
                <option value="cafe">Cafes</option>
                <option value="bakery">Bakeries</option>
                <option value="dining">Fine Dining</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                name="distance"
                value={filters.distance}
                onChange={handleFilterChange}
              >
                <option value="All">Any Distance</option>
                <option value="1km">Within 1 km</option>
                <option value="5km">Within 5 km</option>
                <option value="10km">Within 10 km</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                <option value="All">All Price Ranges</option>
                <option value="low">Under ₹200</option>
                <option value="mid">₹200 - ₹500</option>
                <option value="high">Above ₹500</option>
              </select>
            </div>
          </div>
        </section>

        {/* 🎯 Search Results */}
        <section className="deal-results row g-4">
          {deals.map((deal) => (
            <div key={deal.id} className="col-md-3">
              <Link to={"/dealdetail"}>
                <div className="card deal-card">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{deal.title}</h5>
                    <p className="card-text">📌 {deal.vendor}</p>
                    <p className="card-text">📍 {deal.distance}</p>
                    {/* <div className="d-grid gap-3"> */}
                    <div className="row justify-content-around">
                      <button className="btn btn-success ">Claim Deal</button>
                      <button className="btn btn-outline-primary">
                        Share 📤
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>

        {/* 🔢 Pagination */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <button className="page-link">Previous</button>
            </li>
            <li className="page-item active">
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default SearchResultsPage;
