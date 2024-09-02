import React from "react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaLaptop } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 dark:bg-slate-500 p-4 sticky top-0 left-0 right-0 drop-shadow-xl z-10">
      <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href={"/"}
            className="text-slate-300 no-underline hover:text-white"
          >
            Pratik Guha
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
          <Link
            className="text-white/90 hover:text-white"
          href="https://github.com/Pratik-Guha" target="_blank"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://www.linkedin.com/in/pratik-guha-ba97011b4/" target="_blank"
          >
            <FaLinkedin />
          </Link>
          <Link
            className="text-white/90 hover:text-white"
            href="https://www.instagram.com/pratikguha2019/" target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link
            className="text-gray-300 hover:text-white  dark:hover:text-white"
            href="https://travel-world-zeta.vercel.app/index.html" target="_blank"
          >
            <FaLaptop />
          </Link>
        </div>
      </div>
    </nav>
  );
}
