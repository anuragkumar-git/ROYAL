import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export const PostForm = () => {
  const { register, handleSubmit } = useForm();

  const resetPage = () => {
    // window.location.reload();
    document.getElementById("postForm").reset();
  };
  
  const submitHandler = async (data) => {
    try {
      data.isActive = data.isActive === "true";
      console.log("postData:", data);

      const req = await axios.post(
        "https://node5.onrender.com/user/user",
        data
      );
      console.log(req);
      console.log(req.status);

      req.status == 201 &&
        setTimeout(() => {
          alert(req.data.message);
          resetPage();
        }, 200);
    } catch (error) {
      // console.log(error.message);
      alert(error.message);
    }
    // finally {
    //   alert(req.status);
    // }
  };
  return (
    <>
      <h1>PostForm</h1>
      <div class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card text-white" style={{ borderRadius: "1rem" }}>
                <div class="card-body p-2">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <form id="postForm" onSubmit={handleSubmit(submitHandler)}>
                      <h2 class="fw-bold mb-2 text-uppercase text-center">
                        Details
                      </h2>
                      <hr />
                      <div class="form-group text-start my-2">
                        <label class="form-label mb-1" for="exampleInputEmail1">
                          Name
                        </label>
                        <input
                          {...register("name")}
                          class="form-control"
                          placeholder="Enter Name"
                          autoFocus
                        />
                      </div>

                      <div class="form-group text-start my-2t">
                        <label class="form-label mb-1">Age</label>
                        <input
                          className="form-control"
                          type="text"
                          {...register("age")}
                        />
                      </div>
                      <div class="form-group text-start my-2">
                        <label class="form-label mb-1">Email</label>
                        <input
                          className="form-control"
                          type="text"
                          {...register("email")}
                        />
                      </div>
                      <div class="form-group text-start my-2">
                        <label class="form-label d-block mb-1">Status</label>
                        <div class="form-check form-check-inline">
                          <input
                            {...register("isActive")}
                            class="form-check-input"
                            type="radio"
                            // name="inlineRadioOptions"
                            value="true"
                            // id="status"
                          />
                          <label class="form-check-label" for="active">
                            Active
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            {...register("isActive")}
                            class="form-check-input"
                            type="radio"
                            // name="inlineRadioOptions"
                            value="false"
                            // id="fstatus"
                          />
                          <label class="form-check-label" for="Inactive">
                            Inactive
                          </label>
                        </div>
                      </div>
                      <div class="text-center mt-2">
                        <button
                          type="submit"
                          class="btn btn-outline-light btn-lg px-5 "
                        >
                          Submit
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
    </>
  );
};
