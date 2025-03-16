import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitHandler = async (data) => {
    try {
      const getUser = await axios.post("/login", data);
      // getUser.status === 200
      //   // ? navigate("/skeleton") && console.log("data submitted")
      //   ? alert("logged in") && navigate("/skeleton")
      //   : alert("logged in failed");
      if (getUser.status === 200) {
        toast.error(`Logged In`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        navigate("/userdashboard");
        console.log("data submitted");
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
    }
    // console.log(data);
  };

  const loginValidationSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "Email is required*",
      },
      pattern: {
        value: /^[a-zA-z0-9.+-_%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Enter a valid email",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "Password is required*",
      },
      minLength: {
        value: 6,
        message: "Enter a valid password*",
      },
    },
  };

  return (
    <>
      <ToastContainer
        className="mt-5"
        position="top-right"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card text-white" style={{ borderRadius: "1rem" }}>
                <div class="card-body p-5">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase text-center">
                      Login
                    </h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                      <div class="form-group">
                        <label
                          class="form-label text-start"
                          for="exampleInputEmail1"
                        >
                          Email address
                        </label>
                        <input
                          {...register(
                            "email",
                            loginValidationSchema.emailValidator
                          )}
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          autoFocus
                        />
                        <span className="error">{errors.email?.message}</span>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="exampleInputPassword1">
                          Password
                        </label>
                        <input
                          {...register(
                            "password",
                            loginValidationSchema.passwordValidator
                          )}
                          type="password"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                        <span className="error">
                          {errors.password?.message}
                        </span>
                      </div>

                      <div class="text-center">
                        <button
                          type="submit"
                          class="btn btn-outline-light btn-lg px-5 "
                        >
                          Submit
                        </button>
                      </div>
                      <div class="text-center">
                        <p class="mb-0">
                          Don't have an account?{" "}
                          <Link to="/signup">Signup</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
