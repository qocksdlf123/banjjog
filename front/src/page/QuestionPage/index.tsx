import "./style.scss";
import UnLock from "../../assets/GameListPageAssets/UnLock.png";
import Lock from "../../assets/GameListPageAssets/Lock.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface QuestionProps {
  day: number;
}

const QuestionPage = () => {
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default QuestionPage;

const Header = () => {
  return (
    <div className="question-header">
      <div className="question-header-title">
        <div></div>
        <PageNum />
      </div>
      <ProgressBar cur={1} total={10}></ProgressBar>
    </div>
  );
};

const PageNum = () => {
  return (
    <div>
      {" "}
      {localStorage.getItem("curPage")} / {localStorage.getItem("totalPage")}{" "}
    </div>
  );
};

interface ProgressBarProps {
  cur: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ cur, total }) => {
  const progress = (cur * 100) / total;

  return (
    <div style={{ border: "1px solid #ccc", width: "80%" }}>
      <div
        style={{
          width: `${progress}%`,
          height: "3vh",
          backgroundColor: "black",
        }}
      ></div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="gameList-body">
      <GameListItem isLock={true} title={GameList.Day1}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day2}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day3}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day4}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day5}></GameListItem>
      <GameListItem isLock={false} title={GameList.Day6}></GameListItem>
    </div>
  );
};

const Footer = () => {
  return <div className="question-footer"></div>;
};

const GameList = {
  Day1: "Day 1. 소통 우리의 감정 맞춰보기",
  Day2: "Day 2. 성&사랑 판타지 속 ‘장소’ 탐색하기",
  Day3: "Day 3. 경제&생활 주머니 사정 공개 가능?",
  Day4: "Day 4. 소통 우리의 격려 유형은?",
  Day5: " Day 5. 성&사랑 판타지 속 ‘분위기’ 탐색하기",
  Day6: " Day 6. 경제&생활 데이트 비용에 관하여",
};

const GameListItem: React.FC<{ isLock: boolean; title: string }> = ({
  isLock,
  title,
}) => {
  if (isLock) {
    return (
      <div className="gameList-item">
        <img className="gameList-item-unlock" src={UnLock} />
        <div>{title}</div>
      </div>
    );
  } else {
    return (
      <div className="gameList-item">
        <img className="gameList-item-lock" src={Lock} />
        {title}
      </div>
    );
  }
};
