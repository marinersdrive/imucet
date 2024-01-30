import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";

function TestSeriesPage() {
  const categories = [
    { id: 1, label: "Physics", syllabusLink: "https://drive.google.com/file/d/1H2xSTWIVVdkIzqCY80WczWzy5nndAHjF/view?usp=drive_link"},
    { id: 2, label: "Chemistry", syllabusLink: "https://drive.google.com/file/d/1GpzDhYcZ1khRLRuViNuva6SttANSZlC-/view?usp=drive_link" },
    { id: 3, label: "Mathematics", syllabusLink: "https://drive.google.com/file/d/1znzCZTBfOXT2W5PqFSG2JHaXV6_e_mlF/view?usp=drive_link" },
    { id: 4, label: "General English", syllabusLink: "https://drive.google.com/file/d/1sTba7yqDwCBKl8ZXpurSfSPSMbGZLIJD/view?usp=drive_link" },
    { id: 5, label: "General Aptitude", syllabusLink: "https://drive.google.com/file/d/1FHdjiqELvWgbQVvCY9XZddNFuC6k5LuQ/view?usp=drive_link" },
    { id: 6, label: "General Knowledge", syllabusLink: "https://drive.google.com/file/d/12f0pSj1HOoynEtrVQ5ZBBtxLbo6za7y7/view?usp=drive_link" },
    { id: 7, label: "PCM", syllabusLink: "https://drive.google.com/file/d/12-QBTSVySKK40-MnzYbiROsm367Dx3U8/view?usp=drive_link" },
    { id: 8, label: "Final Mock", syllabusLink: "https://drive.google.com/file/d/1qpqJ-2ovQkEitaGoGSzxDuwK3x4rSu4D/view?usp=drive_link" },
  ];

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Subject");

  const handleCategoryClick = (categoryName) => {
    localStorage.setItem("selectedCategory", categoryName);
    navigate("/instructionspage");
  };

  const getDetailsByCategory = (category) => {
    switch (category.id) {
      case 7: // PCM
        return { questions: 90, minutes: 90, marks: 90 };
      case 8: // Final Mock
        return { questions: 200, minutes: 180, marks: 200 };
      default:
        return { questions: 30, minutes: 30, marks: 30 };
    }
  };

  const filteredCategories =
    selectedTab === "Subject" ? categories.slice(0, 6) : categories.slice(6);

  return (
    <div className="min-h-screen sm:px-8 px-6 pt-6 mb-4 sm:mb-0 font-montserrat overflow-hidden">
      <div className="flex space-x-2 items-center mb-6">
          <img
            src="./assets/Main Logo.png"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 motion-safe:animate-spin"
          />
        <h1 className="flex text-2xl sm:text-3xl font-bold text-dark-blue">
          My Tests <FaChevronRight className="p-1 m-1" /> IMUCET
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 mb-4 px-2 py-1 w-full md:w-fit md:selection:flex-col rounded-3xl bg-gray-300">
        <div
          className={`cursor-pointer text-center sm:text-left ${
            selectedTab === "Subject"
              ? "bg-white text-blue border-light-blue"
              : "text-blue bg-gray-300"
          } px-4 py-2 rounded-full font-semibold`}
          onClick={() => setSelectedTab("Subject")}
        >
          Subject - Wise
        </div>
        <div
          className={`cursor-pointer text-center sm:text-left ${
            selectedTab === "Mock" ? "bg-white text-blue border-blue-500" : "text-blue bg-gray-300"
          } px-4 py-2 rounded-full font-semibold`}
          onClick={() => setSelectedTab("Mock")}
        >
          Combined Mock
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 py-5">
  {filteredCategories.map((category) => (
    <div
      key={category.id}
      className="border border-gray-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-lg p-4 sm:p-6 bg-white hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 relative"
    >
      <div className="cursor-pointer">
        <h3 className="text-lg sm:text-2xl lg:text-xl font-semibold text-blue mb-2">
          {category.label}
        </h3>
        <p className="text-gray-600 font-medium text-sm sm:text-base">
          Get ready for {category.label} with our comprehensive exam preparation materials.
        </p>
        <p className="text-gray-600 mt-2 sm:mt-4 text-sm sm:text-base">
          {getDetailsByCategory(category).questions} questions &nbsp;|&nbsp; 
          {getDetailsByCategory(category).minutes} minutes &nbsp;|&nbsp; 
          {getDetailsByCategory(category).marks} marks
        </p>
        <div className="flex items-end mt-4 sm:mt-8">
          <span className="text-black font-medium mr-2 text-sm sm:text-base">
            <a href={category.syllabusLink} className="text-gray-600 hover:text-dark-blue hover:font-semibold">
              View Syllabus
            </a>
          </span>
          <FiArrowRightCircle className="text-blue text-xl sm:text-2xl" />
          <button
        className="flex items-right absolute right-4 bottom-2.5 sm:bottom-4 text-sm sm:text-base bg-blue text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-full hover:bg-opacity-90 transition duration-300 ease-in-out"
        onClick={() => handleCategoryClick(category.label)} 
      >
        Start Now
      </button>
        </div>
      </div>
      
    </div>
  ))}
</div>
    </div>
  );
}

export default TestSeriesPage;
