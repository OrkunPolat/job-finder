import React from 'react';

interface DetailModalProps {
  show: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0"></div>
      <div className="bg-white p-6 relative lg:w-[460px] w-96 border-2 border-black">
        <button
          className="absolute top-2 right-2 bg-transparent border-0 text-black text-xl leading-none font-semibold outline-none focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mt-5 mb-10">Apply Job</h2>
        <div className="text-left mx-4 my-4 font-semibold">
          <p className='my-2'><span className="font-bold">Company Name:</span> Ipsum Dolor</p>
          <p className='my-2'><span className="font-bold">Job Name:</span> Ipsum Dolor</p>
          <p className='my-2'><span className="font-bold">Created At:</span> 02.02.2024</p>
          <p className='my-2'><span className="font-bold">Location:</span> Irving</p>
          <p className='my-2'><span className="font-bold">Keyword:</span></p>
          <div className="flex space-x-2 my-2 mb-2">
            <span className="bg-gray-200 px-3 py-1 border-2 border-black">ipsum</span>
            <span className="bg-gray-200 px-3 py-1 border-2 border-black">dolor</span>
            <span className="bg-gray-200 px-3 py-1 border-2 border-black">sit</span>
          </div>
          <p className='my-4'><span className="font-bold">Salary:</span> 2000</p>
          <p className='my-4'><span className="font-bold">Job Description</span></p>
          <p className="border-2 border-black p-2 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt accusantium aliquid aliquam</p>
        </div>
        <div className="flex justify-between mt-2 mx-20">
          <button
            className="bg-white text-black px-4 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black"
            onClick={onClose}
          >
            Close
          </button>
          <button className="bg-black text-white px-4 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
