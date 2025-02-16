import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const Demo14f = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ name: "", date: "", message: "" });
  const [output, setOutput] = useState();

  const [status, setstatus] = useState(false);

  const submitHandler = (data) => {
    console.log("DATA", data);
    setstatus(true);
    setOutput(data);
    console.log("OUTPUT:", output);
  };

  const validationSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "Name is required*",
      },
    },
    dateValidator: {
      required: {
        value: true,
        message: "Date is Required*",
      },
    },
    messageValidator: {
      required: {
        value: true,
        message: "Please wish",
      },
    },
  };
  return (
    <div>
      <h1>Demo14f</h1>
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
          <label>Date</label>
          <input
            type="date"
            {...register("date", validationSchema.dateValidator)}
          />
          <span>{errors.date?.message}</span>
        </div>
        <div>
          <label>Message</label>
          <input
            type="textarea"
            {...register("message", validationSchema.messageValidator)}
          />
          <span>{errors.message?.message}</span>
        </div>
        <div>
          <input type="submit" />
        </div>
        {status == true ? (
          <div>
            <h2>name:{output.name}</h2>
            <h2>date:{output.date}</h2>
            <h2>message:{output.message}</h2>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
