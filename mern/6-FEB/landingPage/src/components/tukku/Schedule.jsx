import React from "react";
import { useForm } from "react-hook-form";

export const Schedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("ERR:", errors);

  const submitHandler = (data) => {
    console.log("Data:", data);
  };

  const validationSchema = {
    usernameValidator: {
      required: {
        value: true,
        message: "Username is required*",
      },
    },
    weightValidator: {
      required: {
        value: true,
        message: "Weight Required*",
      },
      max:{
        value: 10,
        message:"Max 10Kg allowed*"
      }
    },
    addressValidator: {
      required: {
        value: true,
        message: "Address is required",
      },
    },
    pincodeValidator: {
      required: {
        value: true,
        message: "Enter valid Pincode",
      },
      minLength:{
        value:6,
        message: "Enter validPincode"
      },
      maxLength:{
        value:6,
        message: "Enter validPincode"
      }
    },
    dateValidator: {
      required: {
        value: true,
        message: "Select Date",
      },
    },
    timeValidator: {
      required: {
        value: true,
        message: "Select Time",
      },
    },
  };

  return (
    <div>
      <h1>Schedule</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register("userName", validationSchema.usernameValidator)}
          />
          <span>{errors.userName?.message}</span>
        </div>
        <div>
          <label>Weight(min max)</label>
          <input
            type="number"
            {...register("weight", validationSchema.weightValidator)}
          />
          <span>{errors.weight?.message}</span>
        </div>
        <div>
          <label>Address (max length)</label>
          <input
            type="text"
            {...register("address", validationSchema.addressValidator)}
          />
          <span>{errors.address?.message}</span>
        </div>
        <div>
          <label>Pin code (min length)</label>
          <input
            type="number"
            {...register("pinCode", validationSchema.pincodeValidator)}
          />
          <span>{errors.pinCode?.message}</span>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            {...register("date", validationSchema.dateValidator)}
          />
          <label>Time</label>
          <span>{errors.date?.message}</span>
          <input
            type="time"
            {...register("time", validationSchema.timeValidator)}
          />
          <span>{errors.time?.message}</span>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
