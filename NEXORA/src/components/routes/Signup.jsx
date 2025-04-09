import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  // console.log("Serr:", errors);

  const dataHandler = async (data) => {
    try {
      // console.log(data);
      const res = await axios.post("/signup", data);
      console.log(res);

      // console.log(data);
      if (res.status === 409) {
        // console.log("data submitted");
        alert("user already exsist");
        navigate("/");
        //   console.log("user exsist");
        //   console.log(res.status);
      } else if (res.status === 201 || res.status === 200) {
        alert("Account created");
        navigate("/login");
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
    }
    // console.log("Signup:", data);
  };

  const signupValidationSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "Name is required*",
      },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: "Enter a valid name*",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "Email is required*",
      },
      pattern: {
        value: /^[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Provide a valid email*",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "Create a password*",
      },
      minLength: {
        value: 6,
        message: "Minimum 6 character required*",
      },
    },
  };
  return (
    <>
      <div class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card text-white" style={{ borderRadius: "1rem" }}>
                <div class="card-body p-5">
                  <div class="mb-md-2 mt-md-2 pb-2">
                    <form onSubmit={handleSubmit(dataHandler)}>
                      <h2 class="fw-bold mb-2 text-uppercase text-center">
                        Signup
                      </h2>
                      <div class="form-group">
                        <label class="form-label text-start" for="name">
                          Name
                        </label>
                        <input
                          {...register(
                            "name",
                            signupValidationSchema.nameValidator
                          )}
                          autocomplete
                          autoFocus
                          type="text"
                          className="form-control"
                          id="name"
                          aria-describedby="emailHelp"
                          placeholder="Enter your name"
                        />
                        <span class="error">{errors.name?.message}</span>
                      </div>
                      <div class="form-group">
                        <label
                          class="form-label text-start"
                          for="exampleInputEmail1"
                        >
                          Email
                        </label>
                        <input
                          {...register(
                            "email",
                            signupValidationSchema.emailValidator
                          )}
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          autocomplete
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
                            signupValidationSchema.passwordValidator
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
                          Already have an account?{" "}
                          <Link to="/login">Login</Link>
                        </p>
                      </div>

                      <div class="text-center">
                        <p class="mb-0">
                          Register as Business Owner?{" "}
                          <Link to="/businessregistration">Register</Link>
                        </p>
                      </div>
                      <div className="text-center mt-3">
                        <p>or</p>
                        <a
                          href="http://localhost:3000/api/auth/google"
                          className="btn btn-light"
                          style={{ color: "#4285F4", border: "1px solid #ccc" }}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGRHwMV2dmqrsek8owp1KWFP7Uf66_ABvPfuVUVIB0n_VghaNvGnMuGwM1CsQpdWOIeQ&usqp=CAU"
                            alt="Google logo"
                            style={{ width: "20px", marginRight: "10px" }}
                          />
                          Continue with Google
                        </a>
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
