import React from "react";
import "../../assets/css/card.css"
export const Card = () => {
  return (
    <>
      <div class="deal-card">
        <div class="card-icons">
          <i class="fa-regular fa-bookmark save-icon"></i>
          <i class="fa-solid fa-share-nodes share-icon"></i>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwNzN4W5DEjpatX1OVW1x2dJNuqam3FoAYA&s" alt="Fast Food" class="card-image" />
        <div class="card-content">
          <span class="vendor-name">
            🍔 <a href="#">Vendor Name</a>
          </span>
          <span class="deal-offer">💰 20% OFF on all pizzas!</span>
          <button class="claim-deal-btn">Claim Deal</button>
        </div>
      </div>
    </>
  );
};
