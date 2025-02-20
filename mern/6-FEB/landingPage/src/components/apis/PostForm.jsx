import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export const PostForm = () => {
  const { register, handleSubmit } = useForm();
  const submitHandler = async (data) => {
    console.log(data);
    const req = await axios.post("https://node5.onrender.com/user/user", data);
    console.log(req);
  };
  return (
    <div>
      <h1>PostForm</h1>
      <form className="form"onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Name</label>
          <input type="text" {...register("name")} />
        </div>
        <div>
          <label>Age</label>
          <input type="text" {...register("age")} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" {...register("email")} />
        </div>
        <div>
          <label>Status</label>
          <input type="text" {...register("isActive")} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
