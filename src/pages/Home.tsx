import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 md:px-16 lg:px-28 py-20">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Upgrade Your Lifestyle <br />
            <span className="text-blue-600 dark:text-blue-400">with SAVS Tech</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Explore premium electronics, latest gadgets, and must-have tech — all at unbeatable prices. Lightning-fast delivery, exclusive deals, and trusted by 10K+ shoppers.
          </p>

          <ul className="mt-6 space-y-2 text-gray-600 dark:text-gray-400 text-sm list-disc list-inside max-w-md mx-auto lg:mx-0">
            <li>✓ Exclusive Deals on Top Brands</li>
            <li>✓ 24-Hour Express Delivery</li>
            <li>✓ Secure, Seamless Checkout</li>
          </ul>

          <div className="mt-8">
            <Link to="/products">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition duration-300">
                Start Shopping →
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          {/* Light mode image */}
          <img
            src="/hero-light.png"
            alt="Hero Illustration Light"
            className="block dark:hidden w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
          {/* Dark mode image */}
          <img
            src="/hero-dark.png"
            alt="Hero Illustration Dark"
            className="hidden dark:block w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
