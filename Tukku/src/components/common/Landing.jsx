import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <h1>Tukku landing</h1>
      <Link to={"/login"}><button>Login</button></Link>
      <Link to={"/user"}><button>user</button></Link>
      <Link to={"/admin"}><button>Admin</button></Link>
    </div>
  );
};
