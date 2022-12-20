import { Disclosure } from "@headlessui/react";
import Logo from "../../image/logo.png";
import { Link, useNavigate } from "react-router-dom";


export default function NavigationSecond() {
  const navigate = useNavigate();
  const Role = localStorage.getItem("Role");

  return (
    <>
      <div className="min-h-full w-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img width={150} src={Logo} alt="The Checker App" />
                    </div>
                    <div className="hidden md:block">
                      {Role === "CompanyAdmin" ? (
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
                          <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            to={"/companies"}
                          >
                            Companies
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
                      ) : (
                        <div className="ml-10 flex items-baseline space-x-4">
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
