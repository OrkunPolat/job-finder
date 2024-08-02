import React, { useState } from 'react';

interface DetailModalProps {
  show: boolean;
  onClose: () => void;
  job: {
    companyName: string;
    id: string;
    description: string;
    name: string;
    createdAt: string;
    location: string;
    salary: number;
    keywords: string[];
  };
  onApply: (job: { id: string; companyName: string; name: string; location: string }) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ show, onClose, job, onApply }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!show) return null;

  const handleApply = async () => {
    if (isApplied || isProcessing) return;

    setIsProcessing(true);
    try {
      await fetch(`https://novel-project-ntj8t.ampt.app/api/jobs/${job.id}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId: job.id })
      });

      setIsApplied(true);
      onApply({ id: job.id, companyName: job.companyName, name: job.name, location: job.location });
    } catch (error) {
      console.error('Error applying for job:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-[#ffffff] p-6 relative lg:w-[460px] w-96 border-2 border-[#66bb6a]">
        <button
          className="absolute top-2 right-2 bg-transparent border-0 text-[#66bb6a] text-xl leading-none font-semibold outline-none focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mt-5 mb-10 text-[#2f4451]">Apply Job</h2>
        <div className="text-left mx-4 my-4 font-semibold text-[#3e5b6c]">
          <p className='my-2'><span className="font-bold">Company Name:</span> {job.companyName}</p>
          <p className='my-2'><span className="font-bold">Job Name:</span> {job.name}</p>
          <p className='my-2'><span className="font-bold">Created At:</span> {new Date(job.createdAt).toLocaleDateString()}</p>
          <p className='my-2'><span className="font-bold">Location:</span> {job.location}</p>
          <p className='my-2'><span className="font-bold">Keywords:</span></p>
          <div className="flex overflow-x-auto my-2 mb-2">
            {job.keywords.map((keyword, index) => (
              <span key={index} className="bg-[#e0f2f1] px-3 py-1 border-2  mr-2 whitespace-nowrap bg-[#455a64]">
                {keyword}
              </span>
            ))}
          </div>
          <p className='my-4'><span className="font-bold">Salary:</span> ${job.salary.toLocaleString()}</p>
          <p className='my-4'><span className="font-bold">Job Description:</span></p>
          <p className="border-2 border-[#66bb6a] p-2 font-normal text-[#2f4451]">{job.description}</p>
        </div>
        <div className="flex justify-between mt-2 mx-20">
          <button
            className="bg-[#ffffff] bg-[#455a64] px-4 py-2 border-2  shadow-md hover:bg-[#e0f2f1]"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className={`bg-[#66bb6a] text-white px-4 py-2 border-2  ${isApplied ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#57a65a]'}`}
            onClick={handleApply}
            disabled={isApplied || isProcessing}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
