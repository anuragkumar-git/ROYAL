import axios from "axios";
import React, { useState } from "react";

export const Apidemo1 = () => {
  const [message, setmessage] = useState("");
  const [users, setusers] = useState([]);
  const [showData, setshowData] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const usersData = async () => {
    try {
      const res = await axios.get("https://node5.onrender.com/user/use");
      console.log(res.data.data);
      console.log(res.data.message);
      setusers(res.data.data);
      setmessage(res.data.message);
      setshowData(true);
      seterrorMsg("");
    } catch (err) {
      console.log("Api error:", err);
      console.log(err.message);
      setmessage("Failed to Fetch Users");
      setshowData(false);
      seterrorMsg(err.message);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>API1</h1>
      {showData && (
        <>
          <p style={{ color: "green" }}>{message}</p>

          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            {users.map((user) => {
              return (
                <tbody>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
      )}
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
      {errorMsg && (
        <>
          <p style={{ color: "red" }}> {errorMsg}</p>
        </>
      )}

      {/* 
      Default Values:
      showData = false, (empty)
      errorMsg = "" = false */}
      {!showData && !errorMsg ? ( //false->true && false->true = true(call api) |Calling API
        <button onClick={usersData}>Call API</button>
      ) : errorMsg && !showData ? ( //true && false->true = true(retry) | API failed
        <button onClick={usersData}>Retry</button>
      ) : (
        <button onClick={refreshPage}>Refresh</button> //API succeed
      )}
    </div>
  );
};
