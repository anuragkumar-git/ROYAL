import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const MovieDetail = () => {
  const id = useParams().id; // Get movie ID from URL params

  const [detail, setdetail] = useState({});
  const [showDetail, setshowDetail] = useState(false);
  // Dummy movie data (Replace with API response)
  // const gettDetail = async() => {
  //   const res = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=49616d12${id}`);
  //   console.log('detail:',res.data);

  // };
  const getDetail = async () => {
    try {
      console.log(id);
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=49616d12&i=${id}`
      );
      console.log(res.data);
      setdetail(res.data);
      setshowDetail(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      {showDetail && (
        <div className="container mt-2 ">
          {/* <button
        onClick={() => {
          getDetail();
        }}
      >
        detail
      </button> */}
          {/* Title & Ratings */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start">
              <h1 className="fw-bold mb-0">{detail?.Title}</h1>
              <p className="d-inline inline-flex">&nbsp;{detail?.Year}&nbsp;</p>
              <p className="d-inline inline-flex">
                &nbsp;{detail?.Rated}&nbsp;
              </p>
              <p className="d-inline inline-flex">
                &nbsp;{detail?.Runtime}&nbsp;
              </p>
            </div>
            <div>
              <p className="mb-0">
                IMDb
                <br />
                RATING
              </p>

              <span className="badge bg-warning text-dark fs-5">
                {detail?.imdbRating}
              </span>
            </div>
          </div>

          {/* Main Section */}
          <div className="row g-3 mt-0 align-items-stretch">
            {/* Left: detail? Poster (Full Height) */}
            <div className="col-md-3">
              <div className="h-100 rounded-3 shadow">
                <img
                  src={detail?.Poster}
                  alt={detail?.Title}
                  className="img-fluid h-100 rounded-3"
                />
              </div>
            </div>

            {/* Center: Trailer Video (Full Height, Most Space) */}
            <div className="col-md-7">
              <div className="h-100 bg-primary-subtle  rounded-3 shadow">
                <iframe
                  width="100%"
                  height="100%"
                  src={detail?.Trailer}
                  title={detail?.Title}
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-3"
                >
                  Trailer of ${detail?.Title}
                </iframe>
              </div>
            </div>

            {/* Right: More Photos & More Videos (Stacked) */}
            <div className="col-md-2 d-flex flex-column gap-3">
              {/* More Photos (Top Box) */}
              <Link to={`/photos/${detail.imdbID}`}>
                <div className="video-photo-box flex-grow-1 bg-success-subtle d-flex align-items-center justify-content-center rounded-3 shadow">
                  <i class="bi bi-images"></i>
                  <h5 className="text-light">Photos</h5>
                </div>
              </Link>

              {/* More Videos (Bottom Box) */}
              <Link to={`/photos/${detail.imdbID}`}>
                <div className="video-photo-box flex-grow-1 bg-warning-subtle d-flex align-items-center justify-content-center rounded-3 shadow">
                  <i class="bi bi-youtube"></i>
                  <h5 className="text-light">Videos</h5>
                </div>
              </Link>
            </div>
          </div>

          {/* Director, Writers, Stars */}
          <div className="row">
            <div className="col-md-8 mt-4 text-start">
              <p>{detail?.Plot}</p>
              <hr />
              <p>
                <strong>Director:</strong> {detail?.Director}
              </p>
              <hr />
              <p>
                <strong>Writers:</strong> {detail?.Writer}
              </p>
              <hr />
              <p>
                <strong>Stars:</strong> {detail?.Actors}
              </p>
              <hr />
              <p>
                <strong>Genre:</strong> {detail?.Genre}
              </p>
            </div>
            <div className="col-md-4 mt-4 text-end">
              <ul>
                <li>
                  <p>
                    {detail?.Released} <strong> :Released</strong>
                  </p>
                </li>
                <li>
                  <p>
                    {detail?.Type} <strong> :Type</strong>
                  </p>
                </li>
                <li>
                  <p>
                    {detail?.Language} <strong> :Language</strong>
                  </p>
                </li>
                <li>
                  <p>
                    {detail?.BoxOffice} <strong> :BoxOffice</strong>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* {!showDetail ? (
        setTimeout(() => {
          getDetail();
          setshowDetail(true);
        }, 0.1)
      ) : (
        // <button className="mt-5"
        //   onClick={() => {
        //     getDetail();
        //   }}
        // >
        //   detail
        // </button>
        <button
          className="mt-3 mb-5"
          onClick={() => {
            // window.location.replace("/searchMovie"); //reloads the page
            navigate("/searchMovie");
          }}
        >
          Go Back
        </button>
      )} */}
      {showDetail && (
        <button
          className="mt-3 mb-5"
          onClick={() => {
            // window.location.replace("/searchMovie"); //reloads the page
            navigate("/searchMovie");
          }}
        >
          Go Back
        </button>
      )}
    </>
  );
};
