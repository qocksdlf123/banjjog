import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import GameListPage from "./page/GameListPage";
import StartPage from "./page/StartPage";
import QuestionPage from "./page/QuestionPage";
import GameResultPage from "./page/GameResultPage";
import MyResultPage from "./page/MyResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/gameList" element={<GameListPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/gameResult" element={<GameResultPage />} />
        <Route path="/myResult" element={<MyResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
