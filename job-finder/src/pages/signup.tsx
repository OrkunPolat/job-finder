import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose, onSwitchToLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('https://novel-project-ntj8t.ampt.app/api/register', data);
      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else {
        setErrorMessage('An error occurred'); 
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative lg:mb-36 mb-64">
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-2 flex justify-center">SIGN UP</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              className="border px-4 py-2 w-full border-1 border-black"
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              className="border px-4 py-2 w-full border-1 border-black"
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <div className='flex justify-center'>
            <button className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_#1a202c] px-24 py-2 rounded" type="submit">Sign Up</button>
          </div>
        </form>
        <p className="mt-6 text-center">
          Already have an account? <span className="text-blue-700 cursor-pointer" onClick={onSwitchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
