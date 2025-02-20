import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Search = () => {
  const [query, setquery] = useState("");
  const [search, setsearch] = useState([]);
  const [error, seterror] =useState("");
  const movieData = async () => {
    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=49616d1&s=${query}`
      );
      console.log("Data:",res.data);
      setsearch(res.data.Search);
      console.log("Error:",res.data.Error);
      seterror(res.data.Error)

    } catch (err) {
      console.log("errors:",err);
      seterror(err.message)
    }
  };

  return (
    <div>
      {/* <div className="search" style={{backgroundColor:"black"}}>
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setquery(e.target.value);
          }}
        />
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={() => {
            movieData();
          }}
        >
          Search
        </button>
      </div> */}
      <div className="container mt-4">
        <div className="input-group mb-3">
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            aria-label="Search"
            // aria-describedby="search-button"
            onChange={(e) => {
              setquery(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && movieData();
            }}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="search-button"
            onClick={() => {
              movieData();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className=" ml-5 d-flex flex-wrap justify-content-center gap-3">
        {search?.map((movie) => {
          return (
            <div className="card" style={{ width: "18rem" }} key={movie.imdbID}>
              <Link to={`/moviedetail/${movie.imdbID}`}>
                <img
                  src={movie.Poster}
                  class="card-img-top"
                  alt="Hollywood Sign on The Hill"
                />
                <div class="card-body">
                  <h5 class="card-title">{movie.Title}</h5>
                  <p class="card-text ">
                    <b>Type:</b> {movie.Type}
                  </p>
                  <p class="card-text ">
                    <b>Year:</b> {movie.Year}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
