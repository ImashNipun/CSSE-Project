// import React from 'react';

// function HomePage() {
//     return (
//         <div className="bg-gray-100 h-screen">
//             <main className="flex-grow h-full">
//                 <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//                     <div className="px-4 py-6 sm:px-0">
//                         <h1 className="text-3xl font-bold text-gray-900">Welcome to my website!</h1>
//                         <p className="mt-4 text-lg text-gray-500">
//                             This is a simple homepage built with Tailwind CSS.
//                         </p>
//                     </div>
//                 </div>
//             </main>
//             <footer className="bg-white border-t border-gray-200">
//                 <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//                     <p className="text-center text-base text-gray-400">
//                         &copy; 2021 My Website. All rights reserved.
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default HomePage;

import React from "react";
import topupImage from "../assets/topup-image.jpg";

function HomePage() {
  return (
    <div className="bg-gray-100 ">
      {/* Hero Section */}
      <section className="bg-hero-image text-white py-16 bg-left-bottom bg-cover">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">
            Your Ticket to Convenience
          </h1>
          <p className="text-lg mb-8">
            Book your bus tickets, top up your wallet, and travel hassle-free
            with our mobile app.
          </p>
          <button className="bg-white text-blue-500 hover:bg-blue-100 rounded-full py-2 px-6 font-medium">
            Download Now
          </button>
        </div>
      </section>

      {/* Wallet Top-Up Section */}
      <section className="py-12 px-5">
        <div className="container mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Top Up Your Wallet</h2>
              <p className="text-lg text-gray-600">
                Quickly and securely add funds to your wallet to make bus ticket
                booking even more convenient. Enjoy exclusive discounts and
                cashback offers!
              </p>
            </div>
            <div>
              <img
                src={topupImage}
                alt="Wallet Top-Up"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Download Our App Today</h2>
          <p className="text-lg mb-8">
            Get access to the best bus ticket booking experience on the go. Save
            time and money with our user-friendly mobile app.
          </p>
          <button className="bg-white text-blue-500 hover:bg-blue-100 rounded-full py-2 px-6 font-medium">
            Download Now
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border p-4 rounded-lg shadow-md">
              <img src="/service-1.jpg" alt="Service 1" className="mb-4" />
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="border p-4 rounded-lg shadow-md">
              <img src="/service-2.jpg" alt="Service 2" className="mb-4" />
              <p className="text-lg">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
            </div>
            <div className="border p-4 rounded-lg shadow-md">
              <img src="/service-3.jpg" alt="Service 3" className="mb-4" />
              <p className="text-lg">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
