import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BusinessRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm();

  const [step, setStep] = useState(1);
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();

  const submithandler = async (data) => {
    // console.log("data", data);

    if (step === 1) {
      setFormData((prev) => ({ ...prev, ...data }));
      // console.log("businessdata:", formdata);

      setStep(2);
    } else if (step === 2) {
      const complete = { ...formdata, ...data };
      // console.log('operationaldata:', complete);

      try {
        console.log("Completedata:", complete);
        await axios.post("/registerbusiness", complete);
        navigate("/businessdashboard");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }

    // console.log("data", data);
    // await axios.post("/registerbusiness", data);
    // const { shopno, streetAdress, city, pincode, landmark } = data;
    // const mapaddress = { streetAdress, city, pincode, landmark };
    // console.log("map:", mapaddress);
    // const address = { shopno, streetAdress, city, pincode, landmark };
    // console.log("address:", address);

    // console.log(
    //   "Map address:",
    //   data.streetAdress,
    //   data.city,
    //   data.pincode,
    //   data?.landmark
    // );
  };

  const businessRegistrationSchema = {
    NameValidator: {
      required: "Name is Required*",
      // required: {
      //   value: true,
      //   message: "Name is Required*",
      // },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: "Enter a valid Name*",
      },
    },
    contactNumberValidator: {
      required: {
        value: true,
        message: "Contact Number is required*",
      },
      pattern: {
        value: /^(0\d{10}|\+91\s?\d{5}\s?\d{5})$/,
        message: "Enter a valid Contact Number",
        //  ^ → Start of string
        // (0\d{10} → Matches 0 followed by 10 digits (e.g., 09313716914)
        // | → OR operator
        // \+91 → Matches +91 (India’s country code)
        // \s? → Allows an optional space between +91 and the number (e.g., +91 9313716914 or +919313716914)
        // \d{10} → Matches exactly 10 digits after +91
        // )$ → End of string
      },
    },
    owenerEmailValidator: {
      required: {
        value: true,
        message: "Email is Required*",
      },
      pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Enter a valid Email",
      },
    },
    addressValidator: {
      required: {
        value: true,
        message: "Address is Required*",
      },
    },
    cityValidator: {
      required: {
        value: true,
        message: "City is Required*",
      },
    },
    pincodeValidator: {
      required: {
        value: true,
        message: "Pincode is Required*",
      },
      pattern: {
        value: /^[1-9][0-9]{5}$/,
        message: "Enter a valid Pincode",
        //[1-9] → First digit must be between 1-9 (Indian pincodes do not start with 0).
        // [0-9]{5} → Next 5 digits (any digit from 0-9).
      },
    },
  };
  return (
    <>
      <div className="container my-5">
        <div className="row ">
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item active">Restaurant Information</li>
              <li className="list-group-item">Menu and Operational Details</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit(submithandler)}>
            {step === 1 && (
              <>
                <div className=" card col-md-8">
                  <h2 className="text-center">Complete your registration</h2>
                  <div className="card business-cards mt-2">
                    <h4>Restaurant Information</h4>
                    <label>Restaurant Name</label>
                    <input
                      type="text"
                      name="restaurantName"
                      className="form-control"
                      {...register(
                        "restaurantName",
                        businessRegistrationSchema.NameValidator
                      )}
                      //   value={formData.restaurantName}
                      //   required
                    />
                    <span className="error">
                      {errors.restaurantName?.message}
                    </span>
                    <label>Restaurant's Primary Contact Number</label>
                    <input
                      type="text"
                      name="restaurantContactNumber"
                      className="form-control"
                      {...register(
                        "restaurantContactNumber",
                        businessRegistrationSchema.contactNumberValidator
                      )}
                      //   value={formData.restaurantName}
                      //   required
                    />
                    <span className="error">
                      {errors.restaurantContactNumber?.message}
                    </span>
                  </div>

                  <div className="card business-cards mt-2">
                    <h4>Owner Details</h4>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      className="form-control"
                      {...register(
                        "ownerName",
                        businessRegistrationSchema.NameValidator
                      )}
                    />
                    <span className="error">{errors.ownerName?.message}</span>

                    <label>Email Address</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      className="form-control"
                      {...register(
                        "ownerEmail",
                        businessRegistrationSchema.owenerEmailValidator
                      )}
                      //   value={formData.email}
                      //   required
                    />
                    <span className="error">{errors.ownerEmail?.message}</span>

                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="ownerPhone"
                      className="form-control"
                      {...register(
                        "ownerPhone",
                        businessRegistrationSchema.contactNumberValidator
                      )}
                      //   value={formData.phone}
                      //   required
                    />
                    <span className="error">{errors.ownerPhone?.message}</span>
                  </div>

                  <div className="card business-cards mt-2">
                    <h4>Restaurant Address</h4>
                    <label>Shop no.</label>
                    <input
                      type="text"
                      name="shopno"
                      className="form-control"
                      {...register(
                        "shopno",
                        businessRegistrationSchema.addressValidator
                      )}
                    />
                    <span className="error">{errors.shopno?.message}</span>
                    <label>Street Adress</label>
                    <input
                      type="text"
                      name="streetAdress"
                      className="form-control"
                      {...register(
                        "streetAdress",
                        businessRegistrationSchema.addressValidator
                      )}
                    />
                    <span className="error">
                      {errors.streetAdress?.message}
                    </span>
                    {/* <label>Floor (optional)</label>
                <input
                  type="text"
                  name="floor"
                  className="form-control"
                  {...register}
                  //   value={formData.floor}
                />

                <label>Area</label>
                <input
                  type="text"
                  name="area"
                  className="form-control"
                  //   value={formData.area}
                  //   required
                /> */}

                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      {...register(
                        "city",
                        businessRegistrationSchema.cityValidator
                      )}
                      //   value={formData.city}
                      //   required
                    />
                    <span className="error">{errors.city?.message}</span>
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      {...register(
                        "pincode",
                        businessRegistrationSchema.pincodeValidator
                      )}
                      //   value={formData.city}
                      //   required
                    />
                    <span className="error">{errors.pincode?.message}</span>
                    <label>Landmark (optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      className="form-control"
                      {...register("landmark")}
                      //   value={formData.landmark}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      class=" btn btn-outline-light btn-lg px-5 my-2"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                {/* Menu and Operational Details Form */}
                <div className="card business-cards mt-2">
                  <h4>Menu and Operational Details</h4>

                  <label>Menu Type</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("menuType")}
                  />
                  {/* <span className="error">{errors.menuType?.message}</span> */}

                  <label>Operational Hours</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., 9:00 AM - 10:00 PM"
                    {...register("operationalHours")}
                  />
                  {/* <span className="error">
                  {errors.operationalHours?.message}
                </span> */}
                </div>

                {/* Navigation Buttons */}
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-secondary my-2 mx-2"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-light btn-lg my-2"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BusinessRegistration;
