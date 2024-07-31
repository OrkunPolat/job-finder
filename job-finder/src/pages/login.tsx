import React from 'react';

interface LoginProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToSignup }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative lg:mb-36 mb-64">
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-2 flex justify-center">LOGIN</h2>
        <form>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input className="border px-4 py-2 w-full border-1 border-black" type="email" id="email" name="email" />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 " htmlFor="password">Password</label>
            <input className="border px-4 py-2 w-full border-1 border-black" type="password" id="password" name="password" />
          </div>
          <div className='flex justify-center'>
          <button className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_#1a202c] px-24 py-2 rounded" type="submit">Login</button>
          </div>
        </form>
        <p className="mt-6 text-center">
          Don't have an account? <span className="text-blue-700 cursor-pointer" onClick={onSwitchToSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
