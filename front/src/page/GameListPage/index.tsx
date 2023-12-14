import "./style.css";
import UnLock from "../../assets/GameListPageAssets/UnLock.png";
import Lock from "../../assets/GameListPageAssets/Lock.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedDayState } from "../../recoil/atoms";
import { getReply } from "../../api/ReplyAPI";
import { userIdState } from "../../recoil/atoms";
import { myAnswerState, yourAnswerState } from "../../recoil/atoms";

const GameListPage = () => {
  const [selectedDay, setSelectedDay] =
    useRecoilState<number>(selectedDayState);
  useEffect(() => {
    localStorage.setItem("day", "1");

    setSelectedDay(1);
  }, []);
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
      <div className="main-title bold">게임 선택</div>
    </div>
  );
};

const Body = () => {
  const [selectedDay, setSelectedDay] = useState<number>();

  return (
    <div className="gameList-body">
      <GameListItem isLock={false} title={GameList.Day1} day={1}></GameListItem>
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
  const [userId, setUserId] = useRecoilState<number>(userIdState);
  const [day, setDay] = useRecoilState<number>(selectedDayState);
  const [myAnswer, setMyAnswer] = useRecoilState<string>(myAnswerState);
  const [yourAnswer, setYourAnswer] = useRecoilState<string>(yourAnswerState);

  const startGame = () => {
    getReply({ userId: userId, day: day })
      .then((response) => {
        setMyAnswer(response.data.myReply);
        setYourAnswer(response.data.predictedReply);
        history("/gameResult");
      })
      .catch((error) => {
        console.log(error);
        history("/question");
      });
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
  Day1: "Day 1. 소통 \n우리의 감정 맞춰보기",
  Day2: "Day 2. 성&사랑 \n판타지 속 ‘장소’ 탐색하기",
  Day3: "Day 3. 경제&생활 \n주머니 사정 공개 가능?",
  Day4: "Day 4. 소통 \n우리의 격려 유형은?",
  Day5: "Day 5. 성&사랑 \n판타지 속 ‘분위기’ 탐색하기",
  Day6: "Day 6. 경제&생활 \n데이트 비용에 관하여",
};

const GameListItem: React.FC<{
  isLock: boolean;
  title: string;
  day: number;
}> = ({ isLock, title, day }) => {
  const [selectedDay, setSelectedDay] =
    useRecoilState<number>(selectedDayState);

  const selectDay = () => {
    localStorage.setItem("day", day.toString());
    setSelectedDay(day);
  };

  if (isLock) {
    return (
      <div className={"gameList-item"}>
        <img className="gameList-item-icon" src={Lock} />
        <div>{title}</div>
      </div>
    );
  } else {
    return (
      <div
        onClick={selectDay}
        className={`gameList-item ${
          day == selectedDay ? "gameList-isSelected" : ""
        }`}
      >
        <img className="gameList-item-icon" src={UnLock} />
        {title}
      </div>
    );
  }
};
