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
        <header className="flex justify-between items-center p-4 border-4 border-b-black">
          <div className="text-2xl ml-4 md:ml-10 font-semibold">ACME</div>
          <div className="flex space-x-2 mr-4 md:mr-10">
            <button className=" px-4 py-2 mr-5 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black" onClick={() => setShowLoginModal(true)}>Login</button>
            <button className="bg-black text-white px-4 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
          </div>
        </header>


        {/* Main Content */}
        <main className="flex-grow flex flex-col justify-center items-center bg-gray-200 p-8 relative border-4 border-b-black">
          <h1 className="text-xl md:text-4xl font-bold mb-4 md:mb-8">Best Position Ever Found</h1>
          <p className="text-center max-w-xl md:max-w-md mb-4 md:mb-8">
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
        <footer className="bg-white p-4 border-t relative">
          <div className="absolute top-0 left-0 right-0 hidden md:block">
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8">
            <div className="flex flex-col md:flex-row lg:ml-12  mb-16 ml-8">
              <div className="text-2xl mt-2 md:mr-10 font-semibold">ACME</div>
              <div>
                <h2 className="text-xl font-bold mt-2 mb-4">Ready to get started?</h2>
                <p className="lg:w-10/12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mt-6 lg:mr-60 lg:mt-32">
              <div className='text-center'>© 2010 – 2024 Privacy — Terms</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
