import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Route", href: "/route" },
  { name: "Impressum", href: "/impressum" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-background">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/">
                <img
                  alt="Care Chemnitz logo"
                  className="h-10 inline"
                  src="../src/assets/Chemnitz_care.svg"
                />
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      current === item.href
                        ? "bg-main text-white"
                        : "text-main hover:bg-input",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    onClick={() => setCurrent(item.href)}
                    aria-current={current === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {sessionStorage.getItem("userId") ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-main text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-main">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <NavLink
                          className={classNames(
                            active ? "bg-input" : "",
                            "block px-4 py-2 text-sm text-main"
                          )}
                          to="/profile"
                        >
                          Your Profile
                        </NavLink>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          onClick={handleLogout}
                          className={classNames(
                            active ? "bg-input" : "",
                            "block px-4 py-2 text-sm text-main"
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <NavLink
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-main hover:bg-input text-white h-9 hover:text-main rounded-md px-3"
                to="/signin"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* mobile Nav */}
      <div className="fixed z-20 inset-x-0 h-16 bottom-0 bg-main p-4 sm:hidden">
        <div className="flex justify-around">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={classNames(
                current === item.href
                  ? "text-sm text-white text-decoration-line: underline"
                  : "text-sm text-white",
                "flex flex-col items-center block px-4 py-2"
              )}
              onClick={() => setCurrent(item.href)}
              aria-current={current === item.href ? "page" : undefined}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </Disclosure>
  );
}
