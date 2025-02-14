import React from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  // const { formdata, handleForm } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("ERROR:", errors);  

  const dataHandler = (data) => {
    console.log("DATA:", data);
  };

  const validationSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "Username is Requried*",
      },
    },
    passValidator: {
      required: {
        value: true,
        message: "Password is Required*",
      },
    },
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="loginCard">
        {/* <form onSubmit={handleForm(dataHandler)}> */}
        <form onSubmit={handleSubmit(dataHandler)}>
          <div>
            <label>Name</label>
            {/* <input type="text" {...formdata("name")} /> */}
            <input
              type="text"
              {...register("name", validationSchema.nameValidator)}
            />
            <span>{errors.name?.message}</span>
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              {...register("password", validationSchema.passValidator)}
            />
            <span>{errors.password?.message}</span>
          </div>
          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
};
