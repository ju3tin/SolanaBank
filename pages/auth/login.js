import React from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
// layout for page
import Swal from "sweetalert2";

import Auth from "layouts/Auth.js";
import TableAuth from "layouts/TableAuth";

const LOGIN_API_BASE_URL = "https://userapi-git-main-ju3tins-projects.vercel.app/api/auth/signin";

export default function Login() {

  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit1 = async (json) => {
   // e.preventDefault();
//const token = 'asdasd';
    // Send the token to the API route to set the cookie
    const res = await fetch('/api/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: json.accessToken }), // Pass token to the API
    });

    const data = await res.json();
    setMessage(data.message); // Display the response message
  };


  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }
  const successfulAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Succesfully logged in!",
      showConfirmButton: false,
      timer: 800,
    });
  };
  const WrongCredentialsAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Log in failed",
      text: "Wrong credentials!",
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(LOGIN_API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      //const token1 = json.accessToken;
      successfulAlert();
      localStorage.setItem("token", json.accessToken);
      console.log(json.accessToken);
    handleSubmit1(json);
      router.push("/auth/profile4");
    } else {
      WrongCredentialsAlert();
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="username"
                      name="username"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      onChange={handleChange}
                      value={state.username}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={state.password}
                      onChange={handleChange}
                      name="password"
                    />
                    {/* <small role="alert" className="text-red-500 ">
                      {errors.password?.message}
                    </small> */}
                  </div>
                  <div></div>

                  <div className="text-center mt-6">
                    <input
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={(event) => handleSubmit(event)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-full text-center">
                <Link href="/auth/register" className="text-blueGray-200 bold">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = TableAuth;
