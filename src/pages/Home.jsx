import { useEffect, useState } from "react";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faCoffee, faLocationDot, faUser, faIndianRupeeSign, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [load, setLoad] = useState(10);
  const [id, setId] = useState(null);
  const [view, setView] = useState(null);
  const { searchTerm } = useSearch();
  const { experience } = useSearch();
  const [loading, setLoading] = useState(true);
  const { isMobile } = useSearch();

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleView = async (jobId) => {
    setId(jobId);
    console.log("Applied to job with ID:", jobId);
    const job = jobs.filter((job) => job.id === jobId);
    console.log(job[0]);

    setView(job[0]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const keyword = e.target.search.value;
    const yoe = e.target.yoe.value;
    console.log(keyword, yoe);
  };

  useEffect(() => {
    setId(null);

    if (searchTerm || experience) {
      const filteredJobs = jobs.filter((job) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const lowerExperience = experience.toLowerCase();

        const matchesKeyword = searchTerm
          ? job.title.toLowerCase().includes(lowerSearchTerm) ||
            job.company.toLowerCase().includes(lowerSearchTerm) ||
            job.location.toLowerCase().includes(lowerSearchTerm) ||
            job.job_category.toLowerCase().includes(lowerSearchTerm) ||
            job.qualifications.toLowerCase().includes(lowerSearchTerm)
          : true;

        const matchesExperience = experience
          ? job.qualifications &&
            job.qualifications.toLowerCase().includes(lowerExperience)
          : true;

        return matchesKeyword && matchesExperience;
      });

      console.log(filteredJobs);

      setFilterJobs(filteredJobs);
    } else {
      fetchJobs();
    }
  }, [searchTerm, experience]);

    
  const jobList = searchTerm || experience ? filterJobs : jobs;
  return loading ? (
    <p className="mt-10">Loading...</p>
  ) : (
      
      
    <div className="mt-10">
      <h1 className="text-2xl ml-3">Total Jobs: {jobList.length}</h1>
      {jobList.length === 0 && (
        <p className="mt-3 bg-gray-200 p-3">No jobs found</p>
      )}
        <div className="flex">
        
        <div className={`${ id ? "w-2/5" : "w-full" } ${(isMobile && view) ? "hidden" : ""}`}>
          {jobList.map((job, index) =>
            load > index ? (
              <div
                key={job.id}
                className="border-2 border-gray-300 m-3 p-3 rounded"
              >
                <h2
                  className="text-xl cursor-pointer"
                  onClick={() => handleView(job.id)}
                >
                  {job.title}
                </h2>
                <div class="flex gap-3 mt-2 flex-wrap">
                  <p className="w-50 text-sm text-gray-400">
                    <FontAwesomeIcon icon={faBuilding} /> {job.company}
                  </p>
                  <p className="w-50 text-sm text-gray-400">
                    <FontAwesomeIcon icon={faLocationDot} /> {job.location}
                  </p>
                  <p className="w-50 text-sm text-gray-400">
                    <FontAwesomeIcon icon={faUser} /> {job.job_category}
                  </p>
                </div>
                <div className="mt-2">
                  <div>
                    <p>Qualifications:</p>
                    {(() => {
                      let qualifications = [];

                      try {
                        qualifications = JSON.parse(job.qualifications);
                      } catch (e) {
                        qualifications = [];
                      }

                      return qualifications.length ? (
                        <ul className="list-disc pl-5 text-sm text-gray-700 ml-2">
                          {qualifications.map((qual, idx) => (
                            <li key={idx}>{qual}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700">N/A</p>
                      );
                    })()}
                    <p className="mt-1">
                      No. of openings:{" "}
                      <span className="text-sm text-gray-700">
                        {job.number_of_opening}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
        {id ? (
          <div className={`${(isMobile && view) ? "w-full" : "w-3/5 h-screen fixed right-0 p-3"}`}>
            <div className="border-2  border-gray-300 rounded p-3 overflow-y-scroll1 h-screen">
              <h2 className="text-2xl">
                {view.title}{" "}
                <button
                    className="text-gray-400 text-xl float-right hover:text-red-600 cursor-pointer"
                    onClick={() => { setId(null); setView(null) }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </h2>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Job: </span>
                {view.job_category}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Company: </span>
                {view.company}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Location:</span> {view.location}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Salary<span className="text-xs">(<FontAwesomeIcon icon={faIndianRupeeSign} />)</span>:</span>{" "}
                {view.salary_from} -{view.salary_to}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Employment:</span>{" "}
                {view.employment_type}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Remote:</span>{" "}
                {view.is_remote_work ? "Yes" : "No"}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">No. of openings:</span>{" "}
                {view.number_of_opening}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Qualifications:</span>
                {(() => {
                  let qualifications = [];

                  try {
                    qualifications = JSON.parse(view.qualifications);
                  } catch (e) {
                    qualifications = [];
                  }

                  return qualifications.length ? (
                    <ul className="list-disc pl-5 text-sm text-gray-700 ml-2">
                      {qualifications.map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700">N/A</p>
                  );
                })()}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Contact: </span>
                <Link to={`tel:${view.contact}`}>{view.contact}</Link>
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Description: </span>
                <br />
                {view.description}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      {jobList.length > load && (!isMobile || !view) && (
        <button
          onClick={() => setLoad(load + 10)}
          className="bg-gray-400 text-white p-3 py-2 ml-3 rounded-md mt-2 mb-5 hover:bg-blue-800 cursor-pointer"
        >
          Load More...
        </button>
      )}
    </div>
  );
};

export default Home;
