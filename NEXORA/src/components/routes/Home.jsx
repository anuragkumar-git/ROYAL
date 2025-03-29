import React from "react";
import "../../assets/css/Home.css";

export const Home = () => {
  return (
    <div className="landing-page">
      {/* Header Section */}
      <div className="header-section">
        <h1 id="heading">Find the Best Local Deals Near You!</h1>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for deals, restaurants..."
          />
          <button className="search-btn">Search</button>
          {/* <button >📍</button> */}
        </div>
      </div>

      {/* Trending Deals Section */}
      <section className="trending-deals">
        <h2 className="hr mb-3">🔥 Trending Deals</h2>
        <div className="deal-cards ">
          {[...Array(4)].map((_, i) => (
            <div className="deal-card" key={i}>
              <img
                className="card-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwNzN4W5DEjpatX1OVW1x2dJNuqam3FoAYA&s"
                alt="Deal"
              />
              <h3 className="card-hr">Vendor Name</h3>
              <p className="deal-offer">20% OFF on all orders</p>
              <button className="claim-btn">Claim Deal</button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Filters Section */}
      <section className="quick-filters">
        <h2 className="hr my-3">🔎 Quick Filters</h2>
        <div className="btn-group mb-4">
          <button className="btn btn-outline-info">Fast Food</button>
          <button className="btn btn-outline-info">Cafes</button>
          <button className="btn btn-outline-info">Bakeries</button>
          <button className="btn btn-outline-info">Fine Dining</button>
        </div>
        {/* <Card></Card> */}
        <div className="deal-cards">
          {[...Array(12)].map((_, i) => (
            <div className="deal-card" key={i}>
              <img
                className="card-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwNzN4W5DEjpatX1OVW1x2dJNuqam3FoAYA&s"
                alt="Deal"
              />
              <h3 className="card-hr">Vendor Name</h3>
              <p className="deal-offer">30% OFF on meals</p>
              <button className="claim-btn">Claim Deal</button>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Nearby Deals Section */}
      <section className="explore-deals">
        <h2 className="hr my-3">🗺 Explore Nearby Deals</h2>
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed/v1/"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Why Choose Section */}
      <section>
        <h2 className="hr my-3">💡 Why Choose Us?</h2>
        <ul className="list-group ">
          <li className="list-group-item why-li">
            🚀 Find Exclusive Deals not available elsewhere.
          </li>
          <li className="list-group-item why-li">
            📍 Real-Time Nearby Offers – Instant Local Discounts.
          </li>
          <li className="list-group-item why-li">
            🎯 Community-Verified Deals – Trusted and Reviewed.
          </li>
        </ul>
        <button className="join-btn mt-3">Join Today!</button>
      </section>
    </div>
  );
};
