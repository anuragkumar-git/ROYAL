import React from "react";

export const Blood = () => {
  return (
    <div>
      <form >
        <div class ="form-group">
          <label for="donor-name">Full Name:</label>
          <input type="text" id="donor-name" name="donor_name" required />
        </div>
        <div class ="form-group">
          <label for="donor-age">Age:</label>
          <input
            type="number"
            id="donor-age"
            name="donor_age"
            min="18"
            required
          />
        </div>
        <div  class ="form-group">
          <label for="donor-blood-group">Blood Group:</label>
          <select id="donor-blood-group" name="donor_blood_group">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div  class ="form-group">
          <label for="donor-phone">Phone Number:</label>
          <input type="tel" id="donor-phone" name="donor_phone" required />
        </div>
        <div  class ="form-group">
          <label for="last-donation-date">Last Donation Date:</label>
          <input
            type="date"
            id="last-donation-date"
            name="last_donation_date"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
