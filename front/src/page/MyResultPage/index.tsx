import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOpinions } from "../../api/ReplyAPI";
import { selectedDayState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

interface ResGetOpinions {
  day: number;
  text: string;
}

const MyResultPage = () => {
  const userId = parseInt(localStorage.getItem("userId")!);
  const oppUserId = parseInt(localStorage.getItem("oppUserId")!);
  const [myTexts, setMyText] = useState<ResGetOpinions[]>([]);
  const [yourTexts, setYourText] = useState<ResGetOpinions[]>([]);

  useEffect(() => {
    getOpinions(userId)
      .then((response) => {
        setMyText(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("getOpinions : " + error);
      });

    getOpinions(oppUserId)
      .then((response) => {
        setYourText(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("getOpinions : " + error);
      });
  }, []);
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body myTexts={myTexts} yourTexts={yourTexts}></Body>
      <Footer></Footer>
    </div>
  );
};

export default MyResultPage;

const Header = () => {
  return (
    <div className="gameList-header">
      <div className="main-title bold">반쪽 저장소</div>
    </div>
  );
};

interface BodyProps {
  myTexts: ResGetOpinions[];
  yourTexts: ResGetOpinions[];
}
const Body: React.FC<BodyProps> = ({ myTexts, yourTexts }) => {
  const getMyTextByDay = (day: number) => {
    const item = myTexts.find((item) => item.day === day);
    if (item == null) {
      return "게임 미진행";
    }

    return item.text == "" ? "입력 없음" : item.text;
  };

  const getYourTextByDay = (day: number) => {
    const item = myTexts.find((item) => item.day === day);
    if (item == null) {
      return "게임 미진행";
    }
    return item.text == "" ? "입력 없음" : item.text;
  };

  return (
    <div className="myResult-body">
      <Storage
        day={1}
        myAnswer={getMyTextByDay(1)}
        yourAnswer={getYourTextByDay(1)}
      ></Storage>
      <Storage
        day={2}
        myAnswer={getMyTextByDay(2)}
        yourAnswer={getYourTextByDay(2)}
      ></Storage>
      <Storage
        day={3}
        myAnswer={getMyTextByDay(3)}
        yourAnswer={getYourTextByDay(3)}
      ></Storage>
      <Storage
        day={4}
        myAnswer={getMyTextByDay(4)}
        yourAnswer={getYourTextByDay(4)}
      ></Storage>
      <Storage
        day={5}
        myAnswer={getMyTextByDay(5)}
        yourAnswer={getYourTextByDay(5)}
      ></Storage>
      <Storage
        day={6}
        myAnswer={getMyTextByDay(6)}
        yourAnswer={getYourTextByDay(6)}
      ></Storage>
    </div>
  );
};

const Footer = () => {
  const history = useNavigate();
  const next = () => {
    history("/gameResult");
  };

  return (
    <div className="myResult-footer">
      <button onClick={next} className="myResult-footer-btn">
        {" "}
        반쪽 퀴즈 점수 보기
      </button>
    </div>
  );
};

const GameSubject = [
  "",
  "Day 1. 소통",
  "Day 2. 성&사랑",
  "Day 3. 경제&생활",
  "Day 4. 소통",
  " Day 5. 성&사랑",
  " Day 6. 경제&생활",
];

const GameTitle = [
  "",
  "우리의  감정 맞춰보기",
  "판타지 속 ‘장소’ 탐색하기",
  "주머니 사정 공개 가능?",
  "우리의 격려 유형은?",
  "판타지 속 ‘분위기’ 탐색하기",
  "데이트 비용에 관하여",
];

interface StorageProps {
  day: number;
  myAnswer: string;
  yourAnswer: string;
}

const Storage: React.FC<StorageProps> = ({ day, myAnswer, yourAnswer }) => {
  const [selectedDay, setSelectedDay] =
    useRecoilState<number>(selectedDayState);
  useEffect(() => {
    setSelectedDay(1);
  }, []);
  const goResult = () => {
    if (myAnswer != "게임 미진행") {
      setSelectedDay(day);
      localStorage.setItem("day", day.toString());
    }
  };

  return (
    <div
      onClick={goResult}
      className={`myResult-body-container ${
        selectedDay === day ? "myResult-body-selected" : ""
      } `}
    >
      <div> {GameSubject[day]}</div>
      <div> {GameTitle[day]}</div>

      <AnswerContainer isMy day={day} answer={myAnswer}></AnswerContainer>
      <AnswerContainer
        isMy={false}
        day={day}
        answer={yourAnswer}
      ></AnswerContainer>
    </div>
  );
};

interface AnswerContainerProps {
  isMy: boolean;
  day: number;
  answer: string;
}
const AnswerContainer: React.FC<AnswerContainerProps> = ({
  isMy,
  day,
  answer,
}) => {
  if (isMy) {
    return (
      <div
        className="myResult-body-answer-container"
        style={{ backgroundColor: "rgb(255, 197, 131)" }}
      >
        {answer}
      </div>
    );
  }
  return (
    <div
      className="myResult-body-answer-container"
      style={{ backgroundColor: "#FF9750" }}
    >
      {answer}
    </div>
  );
};
