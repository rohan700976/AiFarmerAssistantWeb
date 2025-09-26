import React, { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here (e.g., API call or email service)
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    
    <div className="min-h-screen bg-gray-50 py-6  sm:py-12 flex flex-1">
      <div className="relative py-3 sm:max-w-xl ml-30">
        <div className="absolute inset-0 border h-155  bg-gradient-to-r from-green-700 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-gray-100 shadow-lg sm:rounded-3xl sm:p-20 text-white">
          <div className="text-center pb-8">
            <h1 className="text-4xl font-bold font-sharif text-green-900 pb-5">Contact Us!</h1>
            <p className="text-green-700 text-lg">
              Fill up the form below to send us a message.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type your message here..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ height: "121px" }}
            ></textarea>

            <div className="flex justify-between">
              <button
                type="submit"
                className="shadow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send ➤
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="shadow bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>


            </div>

          </form>
          <div>
      </div>
      
        </div>
      </div>
      
      <div className="h-150 w-full pl-40 mb-10">


       <DotLottieReact
      src="/Welcome.lottie"
      loop
      autoplay 
      
      
    />
      </div>
    </div>
  );
};

export default Contact;
