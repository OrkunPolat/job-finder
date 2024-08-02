"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./login'));
const Signup = dynamic(() => import('./signup'));

const Homepage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <Head>
        <title>ACME - Best Position Ever Found</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b-2 border-gray-300 bg-[#f0f4f8] text-gray-800">
          <div className="text-2xl ml-4 md:ml-10 font-semibold">ACME</div>
          <div className="flex space-x-2 mr-4 md:mr-10">
            <button className="px-4 py-2 bg-[#408d24] hover:bg-[#2a6e3e] text-white shadow-md rounded border-2" onClick={() => setShowLoginModal(true)}>Login</button>
            <button className="bg-[#5a6e71] text-white px-4 py-2 hover:bg-[#3a4d56] shadow-md rounded border-2" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-green-100 p-8 relative border-b-2 border-gray-300">
          <h1 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8 text-gray-800">Best Position Ever Found</h1>
          <p className="text-center text-gray-700 max-w-xl md:max-w-md mb-4 md:mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Login Modal */}
          {showLoginModal && (
            <Login
              onClose={() => setShowLoginModal(false)}
              onSwitchToSignup={handleSwitchToSignup}
            />
          )}

          {/* Sign Up Modal */}
          {showSignUpModal && (
            <Signup
              onClose={() => setShowSignUpModal(false)}
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-[#f0f4f8] p-4 border-t-2 border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8">
            <div className="flex flex-col md:flex-row lg:ml-12 mb-16 ml-8">
              <div className="text-2xl mt-2 md:mr-10 font-semibold text-gray-800">ACME</div>
              <div>
                <h2 className="text-xl font-bold mt-2 mb-4 text-gray-700">Ready to get started?</h2>
                <p className="lg:w-10/12 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mt-6 lg:mr-60 lg:mt-32">
              <div className='text-center text-gray-500'>© 2010 – 2024 Privacy — Terms</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
