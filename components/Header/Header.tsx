import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full z-20 fixed top-0 left-0 px-6 py-4 flex items-center justify-between md:px-8 lg:px-12 bg-stone-900 text-white rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Link href="/">
        <div className="flex pl-3 items-center space-x-2">
          <svg
            className=" h-8 w-8 text-blue-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="text-md font-semibold text-white whitespace-nowrap md:text-xl lg:text-2xl">
            Thomas Schipke
          </span>
        </div>
      </Link>
      <button className="md:hidden" onClick={toggleMenu}>
        <svg viewBox="0 0 100 80" width="40" height="40" fill="#FFF">
          <rect width="100" height="15"></rect>
          <rect y="30" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </button>
      <nav
        className={`fixed inset-0 bg-black bg-opacity-90 z-20 flex flex-col h-screen items-center justify-center transform transition-all ease-in-out ${
          isMenuOpen ? "translate-y-0 absolute" : "-translate-y-full fixed"
        } md:hidden`}
      >
        <button
          aria-label="Close menu"
          className="absolute top-5 right-5"
          onClick={toggleMenu}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Link
          className="text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
          href="#"
        >
          Projects
        </Link>
        <Link
          className="text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
          href="#"
        >
          Contact
        </Link>
      </nav>
      <nav className="hidden md:flex space-x-4 md:pr-3">
        <Link
          className="text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
          href="#"
        >
          Projects
        </Link>
        <Link
          className="text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
