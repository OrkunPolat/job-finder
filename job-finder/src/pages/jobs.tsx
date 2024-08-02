"use client";

import React, { useState, useEffect } from 'react';
import DetailModal from './detail';
import CompanyIcon from './companyIcon';
import "@/app/globals.css";

interface Job {
  id: string;
  companyName: string;
  name: string;
  description: string;
  location: string;
  salary: number;
  keywords: string[];
  createdAt: string;
}

const Jobs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const jobsPerPage = 3;

  const handleModalToggle = (job: Job | null) => {
    setSelectedJob(job);
    setShowModal(!showModal);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterJobs(event.target.value, selectedField);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(event.target.value);
    filterJobs(searchTerm, event.target.value);
  };

  const filterJobs = (search: string, field: string) => {
    const lowerCaseSearch = search.toLowerCase();
    const filtered = jobs.filter(
      job =>
        job.name.toLowerCase().includes(lowerCaseSearch) &&
        (field === '' || job.companyName === field)
    );
    setFilteredJobs(filtered);
  };

  const handleApply = async (job: Job) => {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`https://novel-project-ntj8t.ampt.app/api/jobs/${job.id}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId: job.id })
      });

      setAppliedJobs(prev => [...prev, job]);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const handleWithdraw = async (jobId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`https://novel-project-ntj8t.ampt.app/api/jobs/${jobId}/withdraw`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setAppliedJobs(prev => prev.filter(job => job.id !== jobId));
      } else {
        console.error('Withdraw failed:', response.status);
      }
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://novel-project-ntj8t.ampt.app/api/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
        const data = result.data;

        if (Array.isArray(data)) {
          setJobs(data);
          setFilteredJobs(data);

          const uniqueCompanies = [...new Set(data.map(job => job.companyName))];
          setCompanyNames(uniqueCompanies);
        } else {
          console.error("Error, no data");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen bg-[#f0f4f8]">
      {/* Left Section */}
      <div className="lg:w-2/3 mt-5">
        <header className="flex justify-between items-center pb-4 border-b-2 border-[#9aafbb] bg-[#ffffff] shadow-lg font-semibold">
          <h1 className="text-2xl font-bold lg:ml-14 my-3 ml-3 text-[#3e5b6c]">ACME</h1>
          <div className="flex items-center">
            <a href="#" className="text-[#5c9c5f] hover:underline mr-4">Job List</a>
            <a href="/" className="text-[#3e5b6c] hover:underline lg:mr-8">Logout</a>
            <span className="ml-4 mr-4 lg:mr-3 text-[#3e5b6c]">hr@shft.co</span>
            <div className="w-10 h-10 rounded-full bg-[#e0e0e0] border-2 border-[#3e5b6c] mr-5"></div>
          </div>
        </header>

        {/* Filter Section */}
        <div className="flex items-center border-2 border-[#9aafbb] h-20 bg-[#ffffff] shadow-md font-semibold">
          <div className="mr-6 p-2 lg:ml-7 text-[#3e5b6c]">Basic Filter</div>
          <select className="mr-2 p-2 border-2 border-[#9aafbb] bg-[#ffffff] w-40 lg:w-52 text-[#3e5b6c]" value={selectedField} onChange={handleFieldChange}>
            <option value="">Select a Field</option>
            {companyNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <input
            type="text"
            className="border-2 border-[#9aafbb] bg-[#ffffff] lg:w-80 w-32 p-2 lg:ml-7 placeholder-[#3e5b6c]"
            placeholder="Search Title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Job List */}
        <div className="border border-[#9aafbb] bg-[#ffffff] shadow-md">
          {currentJobs.map((job) => (
            <div key={job.id} className="border border-[#9aafbb] p-4 bg-[#f9f9f9] shadow-md ">
              <div className="flex justify-between items-start">
                <CompanyIcon />
                <div className="lg:mr-96 lg:max-w-lg max-w-52">
                  <h2 className="text-lg font-bold mt-2 text-[#2f4451]">{job.companyName} - {job.name}</h2>
                  <p className="text-sm mt-2 text-[#3e5b6c]">{job.description}</p>
                  <p className="text-sm mt-2 text-[#3e5b6c]">Location: {job.location}</p>
                  <p className="text-sm mt-2 text-[#3e5b6c]">Salary: ${job.salary}</p>
                  <div className="flex space-x-2 mt-4">
                    {job.keywords.slice(0, 3).map((keyword, index) => (
                      <button key={index} className="bg-[#ffffff] px-3 py-1 border-2 border-[#3e5b6c] text-[#3e5b6c] rounded-lg">{keyword}</button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 lg:mr-10 lg:mt-3">
                  <button
                    className="bg-[#66bb6a] text-white lg:min-w-40 min-w-28 py-2 rounded-lg border-2 border-[#66bb6a] shadow-md hover:bg-[#57a65a]"
                    onClick={() => handleModalToggle(job)}
                  >
                    Detail
                  </button>
                  {appliedJobs.some(aJob => aJob.id === job.id) && (
                    <button
                      className="bg-[#455a64] text-white lg:min-w-40 min-w-28 py-2 rounded-lg border-2 border-[#455a64] shadow-md hover:bg-[#37474f]"
                      onClick={() => handleWithdraw(job.id)}
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <footer className="flex justify-between items-center p-4 border-t-2 border-[#9aafbb] bg-[#ffffff] font-semibold">
          <div className="flex items-center space-x-2 ml-4 lg:ml-auto lg:pl-20">
            <button
              className="p-2 bg-[#e0f2f1] border-2 border-[#66bb6a] text-[#66bb6a] rounded-lg shadow-md hover:bg-[#c8e6c9]"
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            >
              Previous
            </button>
            <span className='font-semibold text-[#66bb6a]'>{currentPage} / {Math.ceil(filteredJobs.length / jobsPerPage)}</span>
            <button
              className="p-2 bg-[#e0f2f1] border-2 border-[#66bb6a] text-[#66bb6a] rounded-lg shadow-md hover:bg-[#c8e6c9]"
              onClick={() => setCurrentPage(currentPage < Math.ceil(filteredJobs.length / jobsPerPage) ? currentPage + 1 : currentPage)}
            >
              Next
            </button>
          </div>
          <div className="flex items-center space-x-2 ml-auto mr-5">
            <span className="text-[#66bb6a]">Show</span>
            <select className="p-2 border border-[#66bb6a] bg-white">
              <option>10</option>
            </select>
          </div>
        </footer>
      </div>

      {/* Right Section */}
      <aside className="lg:w-1/3 p-4 bg-[#ffffff] lg:h-screen overflow-auto lg:border-l border-[#9aafbb] mt-10 lg:mt-0">
        <div className="flex flex-col items-center lg:mt-20">
          <div className="w-24 h-24 border-2 border-[#66bb6a] rounded-full bg-[#e0f2f1] lg:ml-10 ml-0"></div>
          <span className="mt-2 font-semibold text-[#2f4451] lg:ml-10 ml-0">hr@shft.co</span>
        </div>
        <h2 className="text-xl font-bold mt-4 lg:mt-8 lg:ml-10 text-[#2f4451] text-center mb-8">Applied Jobs</h2>
        <ul className="mt-2 lg:ml-10 mr-0 lg:mr-10">
          {appliedJobs.map((job) => (
            <li key={job.id} className="border-2 border-[#66bb6a] p-4 mt-2 bg-[#ffffff] shadow-md rounded-lg font-semibold text-center">
              <h3 className="text-lg font-bold mx-4 text-[#2f4451]">{job.name}</h3>
              <p className="text-sm mx-4 text-[#3e5b6c]">{job.companyName}</p>
              <p className="text-sm text-[#3e5b6c]">{job.location}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Modal */}
      {showModal && selectedJob && <DetailModal show={showModal} onClose={() => handleModalToggle(null)} job={selectedJob} onApply={handleApply} />}
    </div>
  );
};

export default Jobs;
