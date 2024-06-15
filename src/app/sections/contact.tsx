"use client";
import Footer from "@/components/footer";
import React from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

type Props = {};

const Contact = (props: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const text: string = "Say Hello";

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
          form.current,
          process.env.NEXT_PUBLIC_PUBLIC_KEY || ""
        )
        .then(
          () => {
            setSuccess(true);
            form.current?.reset();
          },
          () => {
            setError(true);
          }
        );
    }
  };
  return (
    <div className="w-full h-screen space-y-10">
        <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 pb-40 font-semibold">
          {/* TEXT CONTAINER */}
          <div className="hidden h-1/2 lg:h-full lg:w-1/2 md:flex items-center justify-center text-4xl lg:text-7xl underline">
            <div>
              {text.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
          {/* FORM CONTAINER */}
          <form
            onSubmit={sendEmail}
            ref={form}
            className="h-full sm:h-1/2 my-auto md:h-4/5 lg:w-1/2 bg-slate-700 text-white rounded-xl text-xl flex flex-col gap-8 justify-center p-24"
          >
            <span>Dear DH,</span>
            <textarea
              className="bg-transparent border-b-2 border-b-black outline-none resize-none"
              name="user_message"
            />
            <span>My mail address is:</span>
            <input
              name="user_email"
              type="email"
              className="bg-transparent border-b-2 border-b-black outline-none"
            />
            <span>Regards</span>
            <button
              type="submit"
              className="bg-purple-200 rounded font-semibold text-gray-600 p-4"
            >
              Send
            </button>
            {success && (
              <span className="text-green-600 font-semibold">
                Your message has been sent successfully!
              </span>
            )}
            {error && (
              <span className="text-red-600 font-semibold">
                Something went wrong!
              </span>
            )}
          </form>
        </div>
      <Footer />
    </div>
  );
};

export default Contact;
