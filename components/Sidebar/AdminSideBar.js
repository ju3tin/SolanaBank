import React from "react";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function AdminSideBar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [decoded, setDecoded] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuditor, setIsAuditor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const decodedToken = token;
    //const decodedToken = '0898098908';
    setDecoded(decodedToken);
  }, []);

  useEffect(() => {
    if (decoded) {
      setIsAdmin(checkAdmin());
      setIsAuditor(checkAuditor());
    }
  }, [decoded]);

  function checkAdmin() {
    return decoded.authorities === "ROLE_ADMIN";
  }
  function checkAuditor() {
    return decoded.authorities === "ROLE_AUDITOR";
  }

  const router = useRouter();
  return (
    <>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          HOMEPAGE
        </h6>
        <Link href="/" className={"text-xs uppercase py-3 font-bold block "}>
          <i
            className={
              "fas fa-home mr-2 text-sm " +
              (router.pathname.indexOf("/") !== -1
                ? "opacity-75"
                : "text-blueGray-300")
            }
          ></i>{" "}
          MAIN PAGE
        </Link>
        <Link
          href="/admin/dashboard"
          className={
            "text-xs uppercase py-3 font-bold block " +
            (router.pathname.indexOf("/admin/dashboard") !== -1
              ? "text-lightBlue-500 hover:text-lightBlue-600"
              : "text-blueGray-700 hover:text-blueGray-500")
          }
        >
          <i
            className={
              "fas fa-tv mr-2 text-sm " +
              (router.pathname.indexOf("/admin/dashboard") !== -1
                ? "opacity-75"
                : "text-blueGray-300")
            }
          ></i>{" "}
          DASHBOARD
        </Link>

        {isAdmin && (
          <Link
            href="/admin/roles"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/roles") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
          >
            <i
              className={
                "fas fa-user-plus mr-2 text-sm " +
                (router.pathname.indexOf("/admin/roles") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Add Users with Roles
          </Link>
        )}

        {!isAuditor && (
          <Link
            href="/admin/addemployee"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/addemployee") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
          >
            <i
              className={
                "fas fa-user-tie mr-2 text-sm " +
                (router.pathname.indexOf("/admin/addemployee") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Add Employee
          </Link>
        )}

        <hr className="my-4 md:min-w-full" />

        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Profiles & Personnel
        </h6>
        {/* Navigation */}
        <li className="items-center">
          <Link
            href="/admin/userlist"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/userlist") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
          >
            <i
              className={
                "fas fa-users mr-2 text-sm " +
                (router.pathname.indexOf("/admin/userlist") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            User List
          </Link>
        </li>
        <li className="items-center">
          <Link
            href="/admin/personelList"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/personelList") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
          >
            <i
              className={
                "fas fa-users mr-2 text-sm " +
                (router.pathname.indexOf("/admin/personelList") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Personnel List
          </Link>
        </li>
        <li className="items-center">
          <Link
            href="/admin/employeelist"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/employeelist") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
          >
            <i
              className={
                "fas fa-user-tie mr-2 text-sm " +
                (router.pathname.indexOf("/admin/employeelist") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Employee List
          </Link>
        </li>
      </ul>
    </>
  );
}
