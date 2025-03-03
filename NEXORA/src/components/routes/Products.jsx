import React from "react";

export const Products = () => {
  const skeletonCards = Array.from({ length: 20 });

  return (
    <>
      <div className="mx-5 my-5 d-flex flex-wrap justify-content-center gap-3">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="card mx-2 my-2 skeleton-card"
            style={{ width: "14rem", height: "15rem" }}
          >
            <div className="skeleton-image" />
            <div className="card-body">
              <h5 className="skeleton-title" />
              <p className="skeleton-text" />
              <p className="skeleton-text" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
