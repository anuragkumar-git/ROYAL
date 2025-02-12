import React from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  // const { formdata, handleForm } = useForm();
  const { register, handleSubmit } = useForm();

  const dataHandler = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Login</h1>
      <div className="loginCard">
        {/* <form onSubmit={handleForm(dataHandler)}> */}
        <form onSubmit={handleSubmit(dataHandler)}>
          <div>
            <lable>Name</lable>
            {/* <input type="text" {...formdata("name")} /> */}
            <input type="text" {...register("name")} />
          </div>
          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
};
