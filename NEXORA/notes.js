//Business registration
<div className="container mt-5">
        <h2 className="text-center">Complete your registration</h2>

        <div className="row">
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">Restaurant Information</li>
              <li className="list-group-item">Menu and Operational Details</li>
            </ul>
          </div>

          <div className="col-md-8">
            {/* <form onSubmit={handleSubmit}> */}
            <form>
              {/* {step === 1 && ( */}
              <div>
                <h4>Restaurant Information</h4>
                <label>Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  className="form-control"
                  //   value={formData.restaurantName}
                  //   onChange={handleChange}
                  //   required
                />
                <label>Restaurant's Primary Contact Number</label>
                <input
                  type="text"
                  name="restaurantContactNumber"
                  className="form-control"
                  //   value={formData.restaurantName}
                  //   onChange={handleChange}
                  //   required
                />

                {/* <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={nextStep}
                >
                  Next
                </button> */}
              </div>
              {/* )} */}

              {/* {step === 2 && ( */}
              <div>
                <h4 className="mt-4">Owner Details</h4>
                <label>Full Name</label>
                <input
                  type="text"
                  name="ownerName"
                  className="form-control"
                  //   value={formData.ownerName}
                  //   onChange={handleChange}
                  //   required
                />

                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  //   value={formData.email}
                  //   onChange={handleChange}
                  //   required
                />

                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  //   value={formData.phone}
                  //   onChange={handleChange}
                  //   required
                />

                {/* <button
                  type="button"
                  className="btn btn-secondary mt-3 me-2"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={nextStep}
                >
                  Next
                </button> */}
              </div>
              {/* )} */}

              {/* {step === 3 && ( */}
              <div>
                <h4>Restaurant Address</h4>
                <label>Shop Number</label>
                <input
                  type="text"
                  name="shopNumber"
                  className="form-control"
                  //   value={formData.shopNumber}
                  //   onChange={handleChange}
                />

                <label>Floor (optional)</label>
                <input
                  type="text"
                  name="floor"
                  className="form-control"
                  //   value={formData.floor}
                  //   onChange={handleChange}
                />

                <label>Area</label>
                <input
                  type="text"
                  name="area"
                  className="form-control"
                  //   value={formData.area}
                  //   onChange={handleChange}
                  //   required
                />

                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  //   value={formData.city}
                  //   onChange={handleChange}
                  //   required
                />

                <label>Landmark (optional)</label>
                <input
                  type="text"
                  name="landmark"
                  className="form-control"
                  //   value={formData.landmark}
                  //   onChange={handleChange}
                />

                {/* <button type="button" className="btn btn-secondary mt-3 me-2" onClick={prevStep}>Back</button> */}
                <button type="submit" className="btn btn-success mt-3" disabled>
                  Submit
                </button>
              </div>
              {/* )} */}
            </form>
          </div>
        </div>
      </div>