import React from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

export const Demo14 = () => {
  const submitHandler = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const validationSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "Name is required*",
      },
    },
    moNumberValidator: {
      required: {
        value: true,
        message: "Mobile Number is Required*",
      },
      pattern: {
        value: /[7-9]{1}[0-9]{9}/,
        message: " Enter valid contact",
      },
    },
  };
  return (
    <div>
      <h1>Demo14</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name", validationSchema.nameValidator)}
          />
          <span>{errors.name?.message}</span>
        </div>
        <div>
          <label>Mo. Number</label>
          <input
            type="number"
            {...register("moNumber", validationSchema.moNumberValidator)}
          />
          <span>{errors.moNumber?.message}</span>
        </div>
        <div>
          <input type="submit"  />
        </div>
      </form>
    </div>
  );
};
