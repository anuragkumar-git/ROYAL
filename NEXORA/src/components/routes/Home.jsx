import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/HomePage.css";
// import DealDetailsPage from "./DealDetailsPage";

export const Home = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwNzN4W5DEjpatX1OVW1x2dJNuqam3FoAYA&s",
    "https://cdn.dribbble.com/userupload/29769579/file/original-dcb98ce800f0dff04b54930e780c1493.png?resize=400x0",
    "https://st.depositphotos.com/22141860/61672/v/450/depositphotos_616727922-stock-illustration-masala-dosa-south-indian-traditional.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpCaShSbeNjqU8hHEX1EofWJZnqwrcbWb5w&s",
  ];

  return (
    <>
      <div className="homepage">
        {/* 🌟 Hero Section */}
        <section className="hero-section text-center text-white">
          <h1 className="display-4">Find the Best Local Deals Near You!</h1>
          <div className="search-container d-flex justify-content-center">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search for food deals, restaurants..."
            />

            <Link to="/search">
              <button className=" btn btn-primary">Search</button>
            </Link>
            <button className="btn btn-outline-light map-btn">
              📍 View on Map
            </button>
          </div>
        </section>

        {/* 🔥 Trending Deals Section */}
        <section className="trending-deals container my-5">
          <h2>🔥 Trending Deals</h2>
          <div className="row">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="col-md-3 mb-4">
                <Link to={"/dealdetail"}>
                  <div className="card deal-card">
                    <img
                      // src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwNzN4W5DEjpatX1OVW1x2dJNuqam3FoAYA&s`}
                      // src={`https://cdn.dribbble.com/userupload/29769579/file/original-dcb98ce800f0dff04b54930e780c1493.png?resize=400x0`}
                      // src={`https://st.depositphotos.com/22141860/61672/v/450/depositphotos_616727922-stock-illustration-masala-dosa-south-indian-traditional.jpg`}
                      // src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpCaShSbeNjqU8hHEX1EofWJZnqwrcbWb5w&s`}
                      src={`${images[index]},`}
                      alt="Deal"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">🍔 Vendor Name</h5>
                      <p className="card-text">💰 20% OFF on all pizzas!</p>
                      <button className="btn btn-success w-100">
                        Claim Deal
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* <div className="mx-5 my-5 d-flex flex-wrap justify-content-center gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="card mx-2 my-2 skeleton-card"
                // style={{ width: "15rem", height: "15rem" }}
                style={{ width: "20rem", height: "20rem" }}
              >
                <div className="skeleton-image" />
                <div className="card-body">
                  <h5 className="skeleton-title" />
                  <h5 className="skeleton-title">🍔 Vendor Name</h5>
                  <p className="skeleton-text" />
                  <button className="skeleton-text" />
                </div>
              </div>
            ))}
          </div> */}
        </section>

        {/* ⚡ Quick Filters */}
        <section className="quick-filters container">
          <h3>🔍 Quick Filters</h3>
          <div className="btn-group mb-4">
            <button className="btn btn-outline-secondary">Fast Food</button>
            <button className="btn btn-outline-secondary">Cafes</button>
            <button className="btn btn-outline-secondary">Bakeries</button>
            <button className="btn btn-outline-secondary">Fine Dining</button>
          </div>
        </section>

        {/* 🗺 Interactive Map Preview */}
        <section className="map-preview text-center my-5">
          <h3>🗺 Explore Deals Nearby</h3>
          <div className="mt-3">
            <div className=" my-3 d-flex flex-wrap justify-content-center gap-3">
              <div
                className="card my-1 skeleton-card"
                // style={{ width: "14rem", height: "15rem" }}
                style={{ width: "100%", height: "30rem" }}
              >
                {/* <div className="skeleton-image" /> */}
              </div>
            </div>
            <button className="btn btn-dark">View Full Map</button>
          </div>
        </section>

        {/* 💡 Why Tukku? Section */}
        <section className="why-tukku container my-5">
          <h3>💡 Why Choose Tukku?</h3>
          <ul className="list-group">
            <li className="list-group-item">
              🚀 Find Exclusive Deals not available elsewhere.
            </li>
            <li className="list-group-item">
              📍 Real-Time Nearby Offers – Instant Local Discounts.
            </li>
            <li className="list-group-item">
              🎯 Community-Verified Deals – Trusted and Reviewed.
            </li>
          </ul>
          <div className="text-center mt-4">
            <Link to={"/signup"}>
              <button className="btn btn-primary btn-lg">
                Join Tukku Today!
              </button>
            </Link>
          </div>
        </section>

        {/* 📢 Personalized Suggestions */}
        <section className="personalized container my-5">
          <h3>📢 For You</h3>
          <p>Discover deals tailored to your preferences and past searches.</p>
          <button className="btn btn-outline-primary">
            View Personalized Deals
          </button>
        </section>

        {/* 📌 Footer */}
        <footer className="footer bg-dark text-white text-center p-3">
          <p>&copy; {new Date().getFullYear()} Tukku – All Rights Reserved</p>
        </footer>
      </div>
    </>
  );
};
