import React from 'react';
import CompanyIcon from './companyIcon';

const JobsPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:h-screen bg-gray-50 ">
      {/* Left Section */}
      <div className="lg:w-2/3 mt-5">
        <header className="flex justify-between items-center pb-4 border-b-2 border-b-black font-semibold">
          <h1 className="text-2xl font-bold lg:ml-14 my-3 ml-3">ACME</h1>
          <div className="flex items-center">
            <a href="#" className="text-blue-500 underline mr-4">Job List</a>
            <a href="#" className="text-black underline lg:mr-8">Logout</a>
            <span className="ml-4 mr-4 lg:mr-3">hr@shft.co</span>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black mr-5">
            </div>
          </div>
        </header>

        {/* {Filter Section} */}
        <div className="flex items-center border-2 h-20 bg-gray-200 font-semibold">
          <div className="mr-6 p-2 lg:ml-7">Basic Filter</div>
          <select className="mr-2 p-2 border-2 border-black">
            <option>Select a Field</option>
          </select>
          <input type="text" className="border-2 border-black lg:w-80 w-32 p-2 lg:ml-7 placeholder-black" placeholder="Search" />
        </div>
        {/* {Job List} */}
        <div className="border border-black">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-black p-4 font-semibold">
              <div className="flex justify-between items-start">
                <CompanyIcon />
                <div className="lg:mr-96 lg:max-w-lg">
                  <h2 className="text-lg font-bold mt-2">Company Name - Job Name</h2>
                  <p className="text-sm mt-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed
                    possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.
                  </p>
                  <p className="text-sm mt-2">
                    Location: Irving
                  </p>
                  <p className="text-sm mt-2">
                    Salary: 2000$
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <button className="bg-gray-200 px-3 py-1 border-2 border-black">ipsum</button>
                    <button className="bg-gray-200 px-3 py-1 border-2 border-black">dolor</button>
                    <button className="bg-gray-200 px-3 py-1 border-2 border-black">sit</button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 lg:mr-10 lg:mt-3">
                  <button className="bg-black text-white  lg:min-w-40 min-w-28 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black">Detail</button>
                  {i === 1 && <button className="bg-white text-black lg:min-w-40 min-w-28 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black">Withdraw</button>
                  }</div>
              </div>
            </div>
          ))}
        </div>

        {/* {Footer} */}
        <footer className="flex justify-between items-center lg:mt-0 h-16 bg-gray-200">
          <div className="flex items-center space-x-2 ml-5 lg:ml-auto lg:pl-20" >
            <button className="p-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black">Previous</button>
            <span className='font-semibold'>1/10</span>
            <button className="p-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black">Next</button>
          </div>
          <div className="flex items-center space-x-2 ml-auto mr-5">
            <span>Show</span>
            <select className="p-2 border border-gray-300">
              <option>10</option>
            </select>
          </div>
        </footer>

      </div>
      {/* Right Section */}
      <aside className="lg:w-1/3 p-4 bg-gray-50 lg:h-screen overflow-auto lg:border-l border-black mt-10 lg:mt-0">
        <div className="flex flex-col items-center lg:mt-20">
          <div className="w-24 h-24 border-2 border-black rounded-full"></div>
          <span className="mt-2 font-semibold">hr@shft.co</span>
        </div>
        <h2 className="text-xl font-bold mt-4 text-center lg:my-10">Applied Jobs</h2>
        <div className="space-y-4 mt-2 lg:mx-28 font-semibold ">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 mx-5 border-2 border-black bg-gray-200 ">
              <h3 className="text-xl font-bold text-center">Job Name</h3>
              <p className="text-l ml-4 my-2"><span className='font-bold'>Company Name:</span> Ipsum Dolor</p>
              <p className="text-l ml-4"><span className="font-bold">Location: </span> Irving</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default JobsPage;
