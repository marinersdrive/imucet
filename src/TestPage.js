import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FiClock } from "react-icons/fi"; // Import the clock icon
import axios from "axios"; // Import axios for making HTTP requests
import shuffleArray from "shuffle-array"; // Import the shuffle-array library
import { BeatLoader } from "react-spinners";


function TestPage() {

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [remainingTime, setRemainingTime] = useState(30); // 30 minutes in seconds
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [loading, setLoading] = useState(true);
  

  let correct = 0;
  let incorrect = 0;

  const selectedCategory = localStorage.getItem("selectedCategory");

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      navigate(0);
    };
  });

  // Fetch questions from the server
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}api/questions`)
      .then(response => {
        // Filter questions by selectedCategory
        let filteredQuestions;
        let timeInSeconds = 30 * 60;
        let subCategory = "";

        if (selectedCategory === "PCM") {
          const physicsQuestions = shuffleArray(response.data.filter(question => question.category === "Physics").slice(0, 30));
          const chemistryQuestions = shuffleArray(response.data.filter(question => question.category === "Chemistry").slice(0, 30));
          const mathQuestions = shuffleArray(response.data.filter(question => question.category === "Mathematics").slice(0, 30));
          filteredQuestions = [...physicsQuestions, ...chemistryQuestions, ...mathQuestions];
          timeInSeconds = 90 * 60;

        } else if (selectedCategory === "Final Mock") {
          const physicsQuestions = shuffleArray(response.data.filter(question => question.category === "Physics").slice(0, 50));
          const mathQuestions = shuffleArray(response.data.filter(question => question.category === "Mathematics").slice(0, 50));
          const chemistryQuestions = shuffleArray(response.data.filter(question => question.category === "Chemistry").slice(0, 25));
          const englishQuestions = shuffleArray(response.data.filter(question => question.category === "General English").slice(0, 25));
          const aptitudeQuestions = shuffleArray(response.data.filter(question => question.category === "General Aptitude").slice(0, 25));
          const knowledgeQuestions = shuffleArray(response.data.filter(question => question.category === "General Knowledge").slice(0, 25));
          filteredQuestions = [...physicsQuestions, ...mathQuestions, ...chemistryQuestions, ...englishQuestions, ...aptitudeQuestions, ...knowledgeQuestions];
          timeInSeconds = 120 * 60;
        } else {
          filteredQuestions = shuffleArray(response.data.filter(question => question.category === selectedCategory).slice(0, 30));
        }

        setQuestions(filteredQuestions);
        setRemainingTime(timeInSeconds);
        setCurrentSubCategory(subCategory);

        //const correctAnswers = shuffledQuestions.map(question => question.correctOption);
        const correctAnswers = filteredQuestions.map((question) => {
          const correctOptionNumber = question.correctOption; // Increment by 1
          return question.options[correctOptionNumber]; // Access the correct answer using the incremented option number
        });

        //const ans = correctAnswers.map(question => question.options.map(options, correctAnswers));
        //const ans = correctAnswers.map(question => question.option)
        localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
        localStorage.setItem("questions", JSON.stringify(filteredQuestions));

        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [selectedCategory]);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect to decrement remaining time
  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(timer);
        toast.error("Time's up!", {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            handleFinish2();
          },
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  
  // useEffect(() => {
  //   window.history.pushState(null, null, window.location.href);
  //   window.onpopstate = function () {
  //     navigate(0);
  //   };
  // });

  useEffect(() => {
    const enterFullScreen = async () => {
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          await element.mozRequestFullScreen();

        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    enterFullScreen();
  }, []);

  

  function ConfirmDialog({ onYes, onClose }) {
    return (
      <div className="mx-auto text-center">
        <p className="text-gray-600 text-lg mb-4">Are you sure you want to finish?</p>
        <button
          className="bg-green text-white px-4 py-2 rounded-md mr-2 hover:bg-opacity-80 transition duration-300 ease-in-out"
          onClick={navigateToNextPage}
        >
          Yes
        </button>
        <button
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300 ease-in-out"
          onClick={dismissPage}
        >
          No
        </button>
      </div>
    );
  }

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast.error("Please choose an option to proceed.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      //setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Check if selected option is correct and update the counts
      if (selectedOption === currentQuestion.correctOption) {
        setCorrectCount(correctCount + 1);
      } else {
        setIncorrectCount(incorrectCount + 1);
      }

      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }
      else{
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (selectedOption === currentQuestion.correctOption) {
          correct = correct + 1;
          console.log("correct");
          //setCorrectCount(correctCount + 1);
        } else {
          incorrect = incorrect + 1;
          console.log("incorrect");
          //setIncorrectCount(incorrectCount + 1);
        }
        /*toast.warning(<ConfirmDialog onYes={navigateToNextPage} onClose={dismissPage} />, {
          position: "top-center",
          autoClose: false,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
        });*/
        //navigate("/ResultPage");
      }
      handleCorrectCount(correctCount + correct);
      handleIncorrectCount(incorrectCount + incorrect);
      
    }
    
  };

  const handleFinish1 = () => {
    if (selectedOption === null) {
      toast.error("Please choose an option to proceed.", {
        position: "top-center",
        autoClose: 3000,
      });
    }else{
    if (selectedOption === currentQuestion.correctOption) {
      correct = correct + 1;
      console.log("correct");
      //setCorrectCount(correctCount + 1);
    } else {
      incorrect = incorrect + 1;
      console.log("incorrect");
      //setIncorrectCount(incorrectCount + 1);
    }
    toast(<ConfirmDialog onYes={navigateToNextPage} onClose={dismissPage} />, {
      position: "top-center",
      autoClose: false,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
    });
    handleCorrectCount(correctCount + correct);
    handleIncorrectCount(incorrectCount + incorrect);
  }
  };

  const handleFinish2 = () => {
    if (selectedOption === null) {
      handleCorrectCount(correctCount + correct);
      handleIncorrectCount(incorrectCount + incorrect);
      navigate("/ResultPage");
    }else{
    if (selectedOption === currentQuestion.correctOption) {
      correct = correct + 1;
      console.log("correct");
      //setCorrectCount(correctCount + 1);
    } else {
      incorrect = incorrect + 1;
      console.log("incorrect");
      //setIncorrectCount(incorrectCount + 1);
    }
    handleCorrectCount(correctCount + correct);
    handleIncorrectCount(incorrectCount + incorrect);
    navigate("/ResultPage");
  }
  };

  const navigateToNextPage = () => {
    toast.dismiss();
    navigate("/ResultPage"); // Replace with the URL of the next page
  };

  const dismissPage = () => {
    toast.dismiss();
  };

  const handleCorrectCount = (correctCount) =>{
    localStorage.setItem("correctCount", correctCount);
  }

  const handleIncorrectCount = (incorrectCount) =>{
    localStorage.setItem("incorrectCount", incorrectCount);
  }

  // Function to handle selecting an option
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  // Function to clear the selected option
  const handleClearSelection = () => {
    setSelectedOption(null);
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      if (selectedCategory === "PCM" || selectedCategory === "Final Mock") {
        setCurrentSubCategory(`- ${currentQuestion.category}`);
      } else {
        //setCurrentSubCategory(currentQuestion.category);
      }
    }
  }, [questions, currentQuestionIndex, selectedCategory]);
  
  if (loading) {
    // Display loading spinner while questions are loading
    return (
      <div className="h-screen flex items-center justify-center bg-blue text-white">
        <BeatLoader color="#ffffff" loading={loading} />
      </div>
    );
  }

  return (
    <div onCopy={(e) => e.preventDefault()} className="h-screen flex flex-col justify-between font-montserrat overflow-y-none">
      {/* Header section */}
      <div className="bg-blue text-white p-4 flex justify-between items-center hover:bg-opacity-90 transition duration-300 ease-in-out">
        <div className="flex items-center space-x-4">
          <img
            src="https://drive.google.com/uc?export=view&id=1-p8kfTAghruvMN7idVYp5y7U4Lim35in"
            alt="Logo"
            className="sm:w-14 sm:h-12 w-12 h-10"
          />
          <div>
            <p className="text-base sm:text-lg font-semibold">Mariner's Drive</p>
            <p className="text-sm sm:text-base">{selectedCategory} {currentSubCategory}</p>
          </div>
        </div>
        <div className="text-base sm:text-xl flex items-center">
          <FiClock className="sm:mr-2 mr-1 pb-0.5 sm:pb-0" />
          Time Left: {Math.floor(remainingTime / 60).toString().padStart(2, '0')}:{(remainingTime % 60).toString().padStart(2, '0')}
        </div>
      </div>

      
        {/*Render the question and options section*/}
      
        {/* Question information section */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center hover:bg-opacity-90 transition duration-300 ease-in-out">
            <p className="text-black text-opacity-80 sm:text-base font-medium text-xs">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className="text-black text-opacity-80 sm:text-base font-medium text-xs">Marks: 1</p>
            <p className="text-black text-opacity-80 sm:text-base font-medium text-xs">Section: DG Exit Exam</p>
          </div>
        </div>
          
          {currentQuestion && (
            <div className="bg-white flex-grow sm:p-12 p-10">
            {/* Question and options section */}
              <div>
                <div className="text-black font-medium text-base sm:text-lg mb-12 sm:mt-8 mt-4">{currentQuestion.question}</div>
                <div>
          
                
                {currentQuestion.imageData && (
                  <img src={currentQuestion.imageData} alt="img" style={{ maxWidth: "300px", height: "auto" }}/>
                )}
              
                </div>
                
                <ul className="space-y-6 mt-10">
                  {currentQuestion.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2 text-sm sm:text-base">
                  <div className="text-black text-sm sm:text-base"><b>{String.fromCharCode(65 + optionIndex)}.</b></div>
                  <input
                    type="radio"
                    name="option"
                    id={`option${optionIndex}`}
                    checked={selectedOption === optionIndex}
                    onChange={() => handleOptionSelect(optionIndex)}
                  />
                  <label htmlFor={`option${optionIndex}`}>
                    {option}
                  </label>
                </div>
                ))}
                </ul>
              </div>
              </div>)}

              {/* Button section */}
              <div className="bg-blue text-white text-sm sm:text-base p-4 text-center flex justify-between items-center hover:bg-opacity-90 transition duration-300 ease-in-out">
              <button
                className="px-10 py-3 bg-dark-blue rounded-lg hover:bg-orange-dark font-semibold"
                onClick={handleClearSelection}
              >
                Clear
              </button>

              {isLastQuestion ? (
              <button className="px-10 py-3 bg-green rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 ease-in-out" onClick={()=>{handleFinish1()}}>Finish</button>
              ) : (<button className="px-10 py-3 bg-dark-blue rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 ease-in-out" onClick={handleNextQuestion}>Next</button>)}
          
              {console.log(correctCount)}
              {console.log(incorrectCount)}
              
              </div>
            
          
        
      <ToastContainer />
    </div>
  );
}

export default TestPage;
