import React from "react";
import { useForm } from "react-hook-form";

export const Signup = () => {
  const submitHandler = (data) => {
    console.log("Data:", data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("Errors:", errors);

  const handlerSchema = {
    userNameValidator: {
      required: {
        value: true,
        message: "UserName is required*",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "Email is reqired*",
      },
    },
    passwordvalidator: {
      required: {
        value: true,
        message: "Password is Required*",
      },

      minLength: {
        value: 5,
        message: "Aleast 5 characters Required*",
      },
    },
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            {...register("name", handlerSchema.userNameValidator)}
          />
          <span>{errors.name?.message}.</span>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", handlerSchema.emailValidator)}
          />
          <span>{errors.email?.message}</span>
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            {...register("password", handlerSchema.passwordvalidator)}
          />
          <span>{errors.password?.message}</span>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
