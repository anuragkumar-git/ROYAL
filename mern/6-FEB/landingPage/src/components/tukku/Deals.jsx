import React from "react";
import { Link } from "react-router-dom";

export const Deals = () => {
  return (
    <div>
      <ul>
        <h1>Deals</h1>
        <li>
          <Link to="/deals/playstation">Play Staion</Link>
        </li>
        <li>
          <Link to="/deals/xbox">X-Box</Link>
        </li>
      </ul>
    </div>
  );
};
