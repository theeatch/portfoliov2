"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
type Props = {};

const Footer = (props: Props) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClick2 = () => {
    const targetElement = document.getElementById('main');
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  };
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 bottom-0 sticky w-full">
      <div className="w-full mx-auto py-6 px-24">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/logopic.png"
              alt="logo"
              width={50}
              height={50}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DH Portfolio
            </span>
          </Link>
          <ul className="flex flex-wrap gap-6 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <button
                onClick={handleClick}
                className="hover:underline me-4 md:me-6 text-3xl"
              >
                About
              </button>{" "}
            </li>
            <li>
              <button
                onClick={handleClick2}
                className="hover:underline me-4 md:me-6 text-3xl"
              >
                Explore
              </button>
            </li>
            
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            DH
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
