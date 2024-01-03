import "./index.css";
import "./InstructionsPage.css";
import "./MainPage.css";
import MainPage from "./MainPage";
import InstructionsPage from "./InstructionsPage";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";
import AnswerKeyPage from "./AnswerKey";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/instructionspage" element={<InstructionsPage/>}/>
        <Route path="/testpage" element={<TestPage/>}/>
        <Route path="/resultpage" element={<ResultPage/>}/>
        <Route path="/answerkeypage" element={<AnswerKeyPage/>}/>
      </Routes>
    </>
  );
}

export default App;
