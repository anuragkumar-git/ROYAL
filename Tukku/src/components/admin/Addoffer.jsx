import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Addoffer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log('input:',data);
  };

  const couponValidationSchema = {
    codeValidator: {
      required: {
        value: true,
        message: "Coupon code is required*",
      },
      //   pattern: {
      //     value: /^[a-zA-z0-9.+-_%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //     message: "Enter a valid email",
      //   },
    },
    amountValidator: {
      required: {
        value: true,
        message: "Amount is required*",
      },
      //   minLength: {
      //     value: 6,
      //     message: "Enter a valid password*",
      //   },
    },
    dateValidator:{
        required:{
            value: true,
            message: "Date is required*"
        }
    }
  };

  return (
    <div class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card text-white" style={{ borderRadius: "1rem" }}>
              <div class="card-body p-5">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <h2 class="fw-bold mb-2 text-uppercase text-center">
                      New Offer
                    </h2>
                    <hr />
                    <div class="form-group">
                      <label
                        class="form-label text-start"
                        for="couponCode"
                      >
                        Coupon code
                      </label>
                      <input
                        {...register(
                          "code",
                          couponValidationSchema.codeValidator
                        )}
                        type="text"
                        class="form-control"
                        // id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter code"
                        autoFocus
                      />
                      <span className="error">{errors.code?.message}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="exampleInputPassword1">
                        Coupon amount
                      </label>
                      <input
                        {...register(
                          "amount",
                          couponValidationSchema.amountValidator
                        )}
                        type="text"
                        class="form-control "
                        // id="exampleInputPassword1"
                        placeholder="Enter amount"
                      />
                      <span className="error">{errors.amount?.message}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="exampleInputPassword1">
                        Expiry date
                      </label>
                      <input
                        {...register(
                          "date",
                          couponValidationSchema.dateValidator
                        )}
                        type="date"
                        class="form-control "
                        // id="exampleInputPassword1"
                        placeholder="Select date"
                      />
                      <span className="error">{errors.date?.message}</span>
                    </div>

                    <div class="text-center">
                      <button
                        type="submit"
                        class="btn btn-outline-light btn-lg px-5 "
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
