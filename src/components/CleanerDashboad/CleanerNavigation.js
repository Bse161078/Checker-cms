import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../../constants";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CleanerNavigation({ user }) {
  const navigate = useNavigate();
  const Role = localStorage.getItem("Role");
  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <>
      <div className="min-h-full w-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex-shrink-0">
                      <img
                        style={{ padding: "50px" }}
                        width={150}
                        height={100}
                        src={BASEURL + "/" + user?.hotel?.avatar}
                        alt="The Checker App"
                      />
                    </div>
                    <div className="hidden md:block ">
                      {Role === "SuperAdmin" ? (
                        <div className="ml-10 flex items-baseline space-x-4">
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/"}
                          >
                            Dashboard
                          </Link>
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/hotels"}
                          >
                            Hotels
                          </Link>
                          {/* <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/companies"}
                          >
                            Companies
                          </Link> */}
                          <div style={{ marginLeft: "20px" }}>
                            <button
                              style={{ marginLeft: "20px" }}
                              className="text-white bg-blue-400 px-3 py-2 rounded-md text-sm font-medium "
                              onClick={() => {
                                localStorage.clear();
                                navigate("/login");
                              }}
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      ) : Role === "Cleaner" ? (
                        <>
                          <button
                            className="text-white bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                              localStorage.clear();
                              navigate("/login");
                            }}
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <div className="ml-10 flex items-baseline space-x-4">
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/receptions"}
                            onClick={() => {}}
                          >
                            Receptions
                          </Link>
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/reports"}
                            onClick={() => {}}
                          >
                            Reports
                          </Link>

                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/levels"}
                            onClick={() => {}}
                          >
                            Levels
                          </Link>
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/rooms"}
                            onClick={() => {}}
                          >
                            Rooms
                          </Link>
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/checkers"}
                          >
                            My Checkers
                          </Link>
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/cleaners"}
                          >
                            My Cleaners
                          </Link>
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/materials"}
                          >
                            Material List
                          </Link>
                          <button
                            className="text-white bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                              localStorage.clear();
                              navigate("/login");
                            }}
                          >
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
