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
    const filtered = jobs.filter(job => 
      job.name.toLowerCase().includes(lowerCaseSearch) &&
      (field === '' || job.companyName === field)
    );
    setFilteredJobs(filtered);
  };

  const handleApply = (job: { id: string; companyName: string; name: string; location: string }) => {
    setAppliedJobs(prev => [...prev, job]);
  };

  const handleWithdraw = (jobId: string) => {
    setAppliedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  useEffect(() => {
    const exampleJobs: Job[] = [
      {
        id: "1",
        companyName: "SHFT",
        name: "Frontend Developer",
        description: "Join our team of passionate developers to build dynamic web applications.",
        location: "Istanbul, TR",
        salary: 120000,
        keywords: ["React", "JavaScript", "CSS"],
        createdAt: "2024-08-01T11:20:08.235Z"
      },
      {
        id: "2",
        companyName: "SHFT",
        name: "Backend Engineer",
        description: "Work on cutting-edge backend technologies to support scalable systems.",
        location: "New York, NY",
        salary: 140000,
        keywords: ["Node.js", "Python", "Django"],
        createdAt: "2024-08-01T11:25:08.235Z"
      },
      {
        id: "3",
        companyName: "Google",
        name: "UX Designer",
        description: "Design intuitive and engaging user experiences for our clients' products.",
        location: "Austin, TX",
        salary: 100000,
        keywords: ["UX", "UI", "Wireframing"],
        createdAt: "2024-08-01T11:30:08.235Z"
      },
      {
        id: "4",
        companyName: "Apple",
        name: "Backend Engineer",
        description: "Work on cutting-edge backend technologies to support scalable systems.",
        location: "New York, NY",
        salary: 140000,
        keywords: ["Node.js", "Python", "Django"],
        createdAt: "2024-08-01T11:25:08.235Z"
      },
      {
        id: "5",
        companyName: "Apple",
        name: "UX Designer",
        description: "Design intuitive and engaging user experiences for our clients' products.",
        location: "Austin, TX",
        salary: 100000,
        keywords: ["UX", "UI", "Wireframing"],
        createdAt: "2024-08-01T11:30:08.235Z"
      },
      {
        id: "6",
        companyName: "Google",
        name: "Frontend Developer",
        description: "Join our team of passionate developers to build dynamic web applications.",
        location: "San Francisco, CA",
        salary: 120000,
        keywords: ["React", "JavaScript", "CSS"],
        createdAt: "2024-08-01T11:20:08.235Z"
      }
    ];

    setJobs(exampleJobs);
    setFilteredJobs(exampleJobs);
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen bg-gray-50">
      {/* Left Section */}
      <div className="lg:w-2/3 mt-5">
        <header className="flex justify-between items-center pb-4 border-b-2 border-b-black font-semibold">
          <h1 className="text-2xl font-bold lg:ml-14 my-3 ml-3">ACME</h1>
          <div className="flex items-center">
            <a href="#" className="text-blue-500 underline mr-4">Job List</a>
            <a href="/" className="text-black underline lg:mr-8">Logout</a>
            <span className="ml-4 mr-4 lg:mr-3">hr@shft.co</span>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-black mr-5"></div>
          </div>
        </header>

        {/* Filter Section */}
        <div className="flex items-center border-2 h-20 bg-gray-200 font-semibold">
          <div className="mr-6 p-2 lg:ml-7">Basic Filter</div>
          <select className="mr-2 p-2 border-2 border-black" value={selectedField} onChange={handleFieldChange}>
            <option value="">Select a Field</option>
            <option value="SHFT">SHFT</option>
            <option value="Google">Google</option>
            <option value="Apple">Apple</option>
          </select>
          <input
            type="text"
            className="border-2 border-black lg:w-80 w-32 p-2 lg:ml-7 placeholder-black"
            placeholder="Search Title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Job List */}
        <div className="border border-black">
          {currentJobs.map((job) => (
            <div key={job.id} className="border border-black p-4 font-semibold">
              <div className="flex justify-between items-start">
                <CompanyIcon />
                <div className="lg:mr-96 lg:max-w-lg">
                  <h2 className="text-lg font-bold mt-2">{job.companyName} - {job.name}</h2>
                  <p className="text-sm mt-2">{job.description}</p>
                  <p className="text-sm mt-2">Location: {job.location}</p>
                  <p className="text-sm mt-2">Salary: ${job.salary}</p>
                  <div className="flex space-x-2 mt-4">
                    <button className="bg-gray-200 px-3 py-1 border-2 border-black">{job.keywords[0]}</button>
                    <button className="bg-gray-200 px-3 py-1 border-2 border-black">{job.keywords[1]}</button>
                    <button className="bg-gray-200 px-3 py-1 border-2 border-black">{job.keywords[2]}</button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 lg:mr-10 lg:mt-3">
                  <button
                    className="bg-black text-white lg:min-w-40 min-w-28 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black"
                    onClick={() => handleModalToggle(job)}
                  >
                    Detail
                  </button>
                  {appliedJobs.some(aJob => aJob.id === job.id) && (
                    <button
                      className="bg-white text-black lg:min-w-40 min-w-28 py-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black"
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

        {/* Footer */}
        <footer className="flex justify-between items-center lg:mt-0 h-16 bg-gray-200">
          <div className="flex items-center space-x-2 ml-5 lg:ml-auto lg:pl-20">
            <button className="p-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>Previous</button>
            <span className='font-semibold'>{currentPage} / {Math.ceil(filteredJobs.length / jobsPerPage)}</span>
            <button className="p-2 shadow-[4px_4px_0px_0px_#1a202c] border-2 border-black" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredJobs.length / jobsPerPage) ? currentPage + 1 : currentPage)}>Next</button>
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
        <div className="space-y-4 mt-2 lg:mx-28 font-semibold">
          {appliedJobs.map((job) => (
            <div key={job.id} className="p-4 mx-5 border-2 border-black bg-gray-200 ">
              <h3 className="text-xl font-bold text-center">{job.name}</h3>
              <p className="text-l ml-4 my-2"><span className='font-bold'>Company Name:</span> {job.companyName}</p>
              <p className="text-l ml-4"><span className="font-bold">Location: </span> {job.location}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Modal */}
      {showModal && selectedJob && <DetailModal show={showModal} onClose={() => handleModalToggle(null)} job={selectedJob} onApply={handleApply} />}
    </div>
  );
};

export default Jobs;
