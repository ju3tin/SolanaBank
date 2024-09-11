import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

// components
import RequestMoney from "./RequestMoney";
import Swal from "sweetalert2";

export default function RequestMoneyList({ requestMoney, color }) {
  const [requestMoneys, setRequestMoneys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestMoneyId, setrequestMoneyId] = useState(null);
  const [responseRequestMoney, setResponseRequestMoney] = useState(null);
  const [search, setSearch] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [isAuditor, setIsAuditor] = useState(false);
  const [isUser, setIsUser] = useState(false);
  let REQUEST_MONEY_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setDecoded(decodedToken);
  }, []);

  useEffect(() => {
    if (decoded) {
      chooseEndPoint();
      setIsAuditor(checkAuditor());
      setIsUser(checkUser());
      fetchData();
    }
  }, [decoded]);

  function checkAuditor() {
    return decoded.authorities === "ROLE_AUDITOR";
  }
  function checkUser() {
    return decoded.authorities === "ROLE_USER";
  }

  function chooseEndPoint() {
    let res = decoded.authorities === "ROLE_USER";
    if (res) {
      REQUEST_MONEY_API_BASE_URL =
        "http://localhost:8080/api/v1/auth/requestmoney/userRequest/" +
        decoded.sub;
    } else {
      REQUEST_MONEY_API_BASE_URL =
        "http://localhost:8080/api/v1/auth/requestmoney";
    }
  }
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(REQUEST_MONEY_API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRequestMoneys(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequestMoney(e, id);
        Swal.fire("Deleted!", "Deleted Succesfully!", "success");
      }
    });
  };

  const deleteRequestMoney = (e, id) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/auth/requestmoney/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (requestMoneys) {
        setRequestMoneys((prevElement) => {
          return prevElement.filter((requestMoney) => requestMoney.id !== id);
        });
      }
    });
  };

  const editRequestMoney = (e, id) => {
    e.preventDefault();
    setrequestMoneyId(id);
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="flex items-center">
                <form>
                  <div class="relative">
                    <div class="absolute inset-b-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa fa-search text-blue-50 mt-3"></i>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      class="block w-full p-2 pl-10 text-sm text-blue-50 border border-gray-300 rounded-lg bg-blueGray-600 "
                      placeholder="Search requestMoney by e-mail..."
                      onChange={(e) => setSearch(e.target.value)}
                      required
                    ></input>
                    <button
                      type="submit"
                      class="text-white absolute right-2.5 bottom-2.5 bg-blue-50 "
                    ></button>
                  </div>
                </form>
                {isUser && (
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <a
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    href="/requestMoney"
                  >
                    Request Money
                  </a>
                </div>)}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {!isUser && (
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-s uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Sent From
                  </th>
                )}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-s uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Sent To
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-s uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Amount
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-s uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Description
                </th>
                {!isAuditor && (
                  <th
                    colSpan={2}
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {requestMoneys
                  ?.filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.payeeEmail.toLowerCase().includes(search);
                  })
                  .map((requestMoney) => (
                    <RequestMoney
                      isUser={isUser}
                      isAuditor={isAuditor}
                      requestMoney={requestMoney}
                      key={requestMoney.id}
                      confirmDelete={confirmDelete}
                      editRequestMoney={editRequestMoney}
                    />
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
