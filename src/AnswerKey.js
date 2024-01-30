// AnswerKeyPage.js
import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

function AnswerKeyPage() {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const selectedCategory = localStorage.getItem("selectedCategory");


  useEffect(() => {
    // Fetch questions and answers from local storage
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const storedCorrectAnswers = JSON.parse(localStorage.getItem("correctAnswers")) || [];

    setQuestions(storedQuestions);
    setCorrectAnswers(storedCorrectAnswers);
  }, []);

  return (
    <div onCopy={(e) => e.preventDefault()} className="min-h-screen sm:px-8 px-6 py-4 font-montserrat overflow-hidden flex flex-col">
      <div className="flex space-x-2.5 items-center mb-5">
          <img
            src="https://github.com/marinersdrive/images/blob/main/Main%20Logo.png?raw=true"
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 motion-safe:animate-spin"
          />
          <h1 className="flex text-lg sm:text-2xl font-bold text-dark-blue">
            {selectedCategory} <FaChevronRight className="p-1 m-1" /> Answer Key
          </h1>
          </div>
      <table className="w-full bg-white text-dark-blue border-gray-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-lg">
        <thead>
          <tr><th className="py-2 px-4 text-sm sm:text-base border-b border-dark-blue font-semibold text-left" style={tableHeaderStyle}>Question No.</th>
            <th className="py-2 px-4 text-sm sm:text-base border-b border-dark-blue font-semibold text-left" style={tableHeaderStyle}>Question</th>
            <th className="py-2 px-4 text-sm sm:text-base border-b border-dark-blue font-semibold text-right" style={tableHeaderStyle}>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
                <td className="py-2 px-4 text-sm sm:text-base border-b border-white font-semibold text-left" style={tableCellStyle}>{index+1}.</td>
              <td className="py-2 px-4 text-sm sm:text-base border-b border-white font-semibold text-left" style={tableCellStyle}>{question.question}</td>
              <td className="py-2 px-4 text-sm sm:text-base border-b border-white font-semibold text-right" style={tableCellStyle}>{correctAnswers[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  };
  
  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

export default AnswerKeyPage;
