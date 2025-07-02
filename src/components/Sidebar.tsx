import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdContact } from "react-icons/io";
import { useUser } from "../context/UserContext";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useUser();

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    onClose();
  };

 return (
  <div className="fixed inset-0 z-50 flex justify-end">
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-40"
      onClick={onClose}
    ></div>

    {/* Sidebar */}
    <div className="relative w-72 bg-white dark:bg-gray-900 h-full shadow-xl transform translate-x-0 transition-transform duration-300 ease-in-out">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white dark:text-gray-300 hover:text-red-500 text-2xl"
        title="Close"
      >
        &times;
      </button>

      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 pb-5">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>

      {/* Divider under header (ALWAYS visible) */}
      <div className="border-t border-gray-300 dark:border-gray-700"></div>

      {/* User Info or Login */}
      <div className="px-6 py-4">
        {user ? (
          <>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow flex items-center gap-1">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-md object-cover"
              />
              <div className="text-left">
                <p className="text-gray-900 dark:text-white font-semibold text-base">
                  {user.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm break-all">
                  {user.email ?? "user@example.com"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-200 shadow"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            onClick={onClose}
            className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:shadow-inner transition py-2"
          >
            <IoIosLogIn /> Login / Sign Up
          </Link>
        )}
      </div>

      {/* Divider under user/login section */}
      <div className="border-t border-gray-300 dark:border-gray-700"></div>

      {/* Menu Items */}
      <nav className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-6 py-4 text-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:shadow-inner transition text-left"
        >
          <MdLightMode /> Light / Dark Mode
        </button>

        <Link
          to="/language"
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-4 text-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:shadow-inner transition"
        >
          <GrLanguage /> Change Language
        </Link>

        <Link
          to="/contact"
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-4 text-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:shadow-inner transition"
        >
          <IoMdContact /> Contact Us
        </Link>
      </nav>
    </div>
  </div>
);
}
export default Sidebar;
