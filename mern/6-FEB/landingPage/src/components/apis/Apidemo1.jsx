import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Slide, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

export const Apidemo1 = () => {
  const [message, setmessage] = useState("");
  const [users, setusers] = useState([]);
  const [showData, setshowData] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  useEffect(() => {
    usersData();
  }, []);

  const usersData = async () => {
    try {
      const res = await axios.get("https://node5.onrender.com/user/user");
      console.log(res.data.data);
      console.log(res.data.message);
      // toast.success(`${res.data.message}`, {
      //   position: "top-left",
      //   autoClose: 100,
      //   hideProgressBar: true,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   transition: Slide,
      // });
      setusers(res.data.data);
      setmessage(res.data.message);
      setshowData(true);
      seterrorMsg("");
    } catch (err) {
      console.log("Api error:", err);
      console.log(err.message);
      console.log(err.status);
      setmessage("Failed to Fetch Users");
      setshowData(false);
      {
        err.status == true
          ? seterrorMsg("Data not Found...")
          : seterrorMsg(err.message);
      }

      seterrorMsg(err.message);
    }
  };

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  // const deleteUser = (id) => {
  //   console.log(id);
  //   // alert(id);
  //   // usersData();
  // };
  const deleteUser = async (id) => {
    try {
      console.log("userid:", id);
      const res = await axios.delete(
        `https://node5.onrender.com/user/user/${id}`
      );
      console.log("deleteapi", res);
      console.log("users:", users);
      let delName;
      const dName = users.map((user) => {
        if (user._id == id) {
          delName = user.name;
          return delName;
        }
      });
      console.log("dName:", dName);
      console.log("delName:", delName);

      res.status == 204 &&
        toast.error(`${delName} Deleted.`, {
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
      usersData();
    } catch (error) {
      console.log(error);
    }
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
      {/* {errorMsg && <><p style={{color:"red"}}>{errorMsg}</p></>} */}

      {/* {!showData ? (
        <>loading</>
      ) : (
        <>
          <p style={{ color: "green" }}>{message}</p>

          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {users.map((user) => {
              return (
                <tbody>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td
                      style={{
                        color: user.isActive == true ? "green" : "red",
                      }}
                    >
                      {user.isActive == true ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
      )} */}
      {/* {!showData && <p style={{ color: "red" }}>Failed to fetch data</p>} */}

      {/* <button
        onClick={() => {
          {
            usersData();
          }
        }}
      >click
      </button> */}
      {/* <button onClick={usersData}>Call API</button> */}
      {/* {errorMsg && (
        <>
          <p style={{ color: "red" }}> {errorMsg}</p>
        </>
      )} */}

      {/* 
      Default Values:
      showData = false, (empty)
      errorMsg = "" = false 
      
      showdata= false && errormsg = false --> loading
      errormsg = true && showdata = false --> error & retry button
      errormsg = false && showdata = true --> data & refresh button
      */}
      {!showData && !errorMsg ? ( //false->true && false->true = true(call api) |Calling API
        <>
          <div className="mt-5 mx-auto">
            <OrbitProgress
              variant="dotted"
              color="#32cd32"
              size="large"
              text=""
              textColor=""
            />
          </div>
        </>
      ) : errorMsg && !showData ? ( //true && false->true = true(retry) | API failed
        <>
          <p style={{ color: "red" }}> {errorMsg}</p>
          <button
            onClick={() => {
              usersData();
            }}
          >
            Retry
          </button>
        </>
      ) : (
        showData &&
        !errorMsg && (
          <>
            <h1>Users Detail</h1>
            <p style={{ color: "green" }}>{message}</p>
            {/* <ToastContainer
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
            /> */}
            <table class="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {users.map((user) => {
                return (
                  <tbody>
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td
                        style={{
                          color: user.isActive == true ? "green" : "red",
                        }}
                      >
                        {user.isActive == true ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <Link to={"/postform"}>
              <button className="mb-3">Add Data</button>
            </Link>
            {/* <button
                onClick={() => {
                  usersData();
                }}
              >
                Refresh
              </button> */}
          </>
        )
      )}
    </>
  );
};
