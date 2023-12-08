import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyResultPage = () => {
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
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

const Body = () => {
  return (
    <div className="myResult-body">
      <Storage day={1}></Storage>
      <Storage day={2}></Storage>
      <Storage day={3}></Storage>
      <Storage day={4}></Storage>
      <Storage day={5}></Storage>
      <Storage day={6}></Storage>
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
const Answer = [
  [],
  ["a. 신남", "b. 우울", "c. 안정", "d. 흥분"],
  ["a. 우울", "b. 걱정", "c. 초조", "d. 실망"],
  ["a. 고마움", "b. 기쁨", "c. 슬픔", "d. 아쉬움"],
  ["a. 고마움", "b. 기쁨", "c. 슬픔", "d. 아쉬움"],

  ["a. 우울", "b. 걱정", "c. 초조", "d. 실망"],

  [
    "a. 배달 온 떡볶이 값을 거짓말해서 차익 챙기기",
    "b. 다른 사람에게 선물 받은 것을 내게 선물하면서 아무 말 하지 않기 ",
    "c. 소득을 거짓말해 커플 통장에 넣는 자기 예금 축소시키기",
    "d. 거짓말은 단 하나도 허용할 수 없다😠!",
  ],
  [
    "a. 배달 온 떡볶이 값을 거짓말해서 차익 챙기기",
    "b. 다른 사람에게 선물 받은 것을 내게 선물하면서 아무 말 하지 않기 ",
    "c. 소득을 거짓말해 커플 통장에 넣는 자기 예금 축소시키기",
    "d. 거짓말은 단 하나도 허용할 수 없다😠!",
  ],
  [
    "a. 배달 온 떡볶이 값을 거짓말해서 차익 챙기기",
    "b. 다른 사람에게 선물 받은 것을 내게 선물하면서 아무 말 하지 않기 ",
    "c. 소득을 거짓말해 커플 통장에 넣는 자기 예금 축소시키기",
    "d. 거짓말은 단 하나도 허용할 수 없다😠!",
  ],
];

interface StorageProps {
  day: number;
  myAnswer: number;
  yourAnswer: number;
}

const Storage: React.FC<{ day: number }> = ({ day }) => {
  const history = useNavigate();
  const goResult = () => {
    history("/totalResult");
  };
  return (
    <div onClick={goResult} className="myResult-body-container">
      <div> {GameSubject[day]}</div>
      <div> {GameTitle[day]}</div>

      <AnswerContainer isMy day={day} answer={1}></AnswerContainer>
      <AnswerContainer isMy={false} day={day} answer={2}></AnswerContainer>
    </div>
  );
};

interface AnswerContainerProps {
  isMy: boolean;
  day: number;
  answer: number;
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
        {Answer[day][answer]}
      </div>
    );
  }
  return (
    <div
      className="myResult-body-answer-container"
      style={{ backgroundColor: "#FF9750" }}
    >
      {Answer[day][answer]}
    </div>
  );
};
