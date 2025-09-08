import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Navabar = () => {
  const { setSearchTerm, setExperience } = useSearch();
  const [keyWord, setKeyword] = useState("");
  const [yoe, setYoe] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  
  const handleSearch = () => {
    setSearchTerm(keyWord);
    setExperience(yoe);
    setOpenMenu(!openMenu);
    //console.log(searchTerm, experience);
  };

  const handleClear = () => {
    setSearchTerm("");
    setExperience("");
    setKeyword("");
    setYoe("");
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={'/'}
          className="flex items-center space-x-1 text-3xl rtl:space-x-reverse"
        >
          <FontAwesomeIcon 
  icon={faGlobe} 
  className="animate-spin-slow text-4xl " 
/>

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Jobs
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span className="sr-only">Open main menu</span>
          {!openMenu ? (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          ) : (
            <FontAwesomeIcon icon={faCircleXmark} />
          )}
        </button>
        <div
          className={`${
            openMenu ? "" : "hidden"
          } md:block md:w-auto" id="navbar-default`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="#" className="block py-2 px-3" aria-current="page">
                <input
                  type="text"
                  name="search"
                  id=""
                  className="border-1 border-gray-300 p-1 focus:border-blue-700 active:border-blue-700"
                  placeholder="Search by skills / job title / company name / location"
                  /*onChange={(e) => searchTerm.setSearchTerm(e.target.value)}*/
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyWord}
                />
                <select
                  name="yoe"
                  id=""
                  className="border-1 border-gray-300 p-1 ml-2 "
                  /*onChange={(e) => experience.setExperience(e.target.value)}*/
                  onChange={(e) => setYoe(e.target.value)}
                >
                  <option value="">Expeirience</option>
                  {[...Array(30).keys()].map((i) => (
                    <option value={i + 1} key={i}>
                      {i + 1} {i === 0 ? "year" : "years"}
                      {i === yoe ? "selected" : ""}
                    </option>
                  ))}
                </select>
                <button
                  className={`${isMobile ? 'mt-2' : ''} bg-gray-700 text-white px-3 py-1 rounded-sm hover:bg-blue-800 ml-2 cursor-pointer` }
                  onClick={() => handleSearch()}
                >
                  Search
                </button>
                <button
                  className="bg-gray-300 text-white px-3 py-1 rounded-sm hover:bg-blue-800 ml-2 cursor-pointer"
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navabar;
