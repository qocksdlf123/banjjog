import "./style.css";
import UnLock from "../../assets/GameListPageAssets/UnLock.png";
import Lock from "../../assets/GameListPageAssets/Lock.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GameListPage = () => {
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default GameListPage;

const Header = () => {
  return (
    <div className="gameList-header">
      <div className="main-title">[텍스트, 제목] 게임 선택</div>
    </div>
  );
};

const Body = () => {
  const [selectedDay, setSelectedDay] = useState<number>();
  return (
    <div className="gameList-body">
      <GameListItem isLock={true} title={GameList.Day1} day={1}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day2} day={2}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day3} day={3}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day4} day={4}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day5} day={5}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day6} day={6}></GameListItem>
    </div>
  );
};

const Footer = () => {
  const history = useNavigate();
  const startGame = () => {
    history("/question");
  };
  return (
    <div className="gameList-footer">
      <button onClick={startGame} className="main-start-btn">
        시작하기
      </button>
    </div>
  );
};

const GameList = {
  Day1: "Day 1. 소통 우리의 감정 맞춰보기",
  Day2: "Day 2. 성&사랑 판타지 속 ‘장소’ 탐색하기",
  Day3: "Day 3. 경제&생활 주머니 사정 공개 가능?",
  Day4: "Day 4. 소통 우리의 격려 유형은?",
  Day5: " Day 5. 성&사랑 판타지 속 ‘분위기’ 탐색하기",
  Day6: " Day 6. 경제&생활 데이트 비용에 관하여",
};

const GameListItem: React.FC<{
  isLock: boolean;
  title: string;
  day: number;
}> = ({ isLock, title, day }) => {
  const selectDay = () => {
    localStorage.setItem("day", day.toString());
  };

  if (isLock) {
    return (
      <div onClick={selectDay} className="gameList-item ">
        <img className="gameList-item-unlock" src={UnLock} />
        <div>{title}</div>
      </div>
    );
  } else {
    return (
      <div onClick={selectDay} className="gameList-item">
        <img className="gameList-item-lock" src={Lock} />
        {title}
      </div>
    );
  }
};
