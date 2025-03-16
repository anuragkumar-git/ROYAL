import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-[#0A3D62] text-[#E8F1F2] min-h-screen">
      {/* Header Section */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#00E6E6]">Delfood</h1>
        <nav className="flex items-center gap-4">
          <button className="text-[#E8F1F2]">Login</button>
          <button className="text-[#E8F1F2]">🔍</button>
          <button className="text-[#E8F1F2]">☰</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center p-10">
        <h2 className="text-4xl font-semibold">Discover Restaurant And Food</h2>
        <p className="text-lg mt-2">Explore the best places around you</p>
        <div className="mt-6 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Restaurant Name"
            className="p-2 rounded-md text-black"
          />
          <select className="p-2 rounded-md text-black">
            <option>All Locations</option>
          </select>
          <button className="bg-[#1E88E5] text-white p-2 rounded-md">Search</button>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="flex justify-center gap-6 my-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-full overflow-hidden w-32 h-32">
            <img
              src="https://via.placeholder.com/150"
              alt="Food Item"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </section>

      {/* Advertisement Banners */}
      <section className="my-10 space-y-6">
        <div className="bg-[#2A9D8F] p-6 rounded-lg text-center">
          <h3 className="text-2xl font-semibold">Payday vibes, vacation time!</h3>
          <p>Up to 75% off</p>
          <button className="bg-white text-black mt-4 p-2 rounded-md">Book now</button>
        </div>

        <div className="bg-[#1E88E5] p-6 rounded-lg text-center">
          <h3 className="text-2xl font-semibold">India's No.1 Premium Hotels</h3>
          <p>Starting from ₹999</p>
          <button className="bg-white text-black mt-4 p-2 rounded-md">Book now</button>
        </div>
      </section>

      {/* Offers Section */}
      <section className="my-10">
        <h3 className="text-3xl font-semibold text-center mb-6">Offers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-[#D9F2E6] p-4 rounded-lg text-black">
              <h4 className="text-xl font-semibold">Up to 40% OFF</h4>
              <p>On Hotels and More</p>
              <button className="bg-[#1E88E5] text-white mt-4 p-2 rounded-md">Book now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
