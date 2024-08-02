import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/app/store';
interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose, onSwitchToLogin }) => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser, errorMessage } = useAuthStore();

  const onSubmit = async (data: any) => {
    await registerUser(data.email, data.password);
    onSwitchToLogin();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative lg:mb-36 mb-64 border border-[#5a6e71]">
        <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-800" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-2 flex justify-center text-gray-800">SIGN UP</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-gray-800" htmlFor="email">Email</label>
            <input
              className="border px-4 py-2 w-full border-[#5a6e71]"
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-gray-800" htmlFor="password">Password</label>
            <input
              className="border px-4 py-2 w-full border-[#5a6e71]"
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <div className='flex justify-center'>
            <button className="bg-[#5a6e71] text-white border-2 border-[#5a6e71] shadow-md px-24 py-2 rounded hover:bg-[#4a5d63]" type="submit">Sign Up</button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-800">
          Already have an account? <span className="text-blue-700 cursor-pointer" onClick={onSwitchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
