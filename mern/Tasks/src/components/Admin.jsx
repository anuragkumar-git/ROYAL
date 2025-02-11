import React from "react";

export const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form>
        <div>
          <label for="admin-username">Username:</label>
          <input
            type="text"
            id="admin-username"
            name="admin_username"
            required
          />
        </div>
        <div>
          <label for="admin-password">Password:</label>
          <input
            type="password"
            id="admin-password"
            name="admin_password"
            required
          />
        </div>
        <div>
          <label for="admin-email">Email:</label>
          <input type="email" id="admin-email" name="admin_email" />
        </div>
        <div>
          <label for="admin-role">Role:</label>
          <select id="admin-role" name="admin_role">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label for="admin-profile-pic">Profile Picture:</label>
          <input type="file" id="admin-profile-pic" name="admin_profile_pic" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
