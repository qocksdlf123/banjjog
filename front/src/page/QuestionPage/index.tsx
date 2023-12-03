import "./style.scss";
import UnLock from "../../assets/GameListPageAssets/UnLock.png";
import Lock from "../../assets/GameListPageAssets/Lock.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface QuestionProps {
  day: number;
}

const QuestionPage = () => {
  useEffect(() => {
    localStorage.setItem("curPage", "1");
    localStorage.setItem("totalPage", "10");
  }, []);

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
    <div className="question-body">
      <QuestionBox></QuestionBox>
    </div>
  );
};

const Footer = () => {
  let curPage = parseInt(localStorage.getItem("curPage")!);
  return (
    <div className="question-footer">
      <SelectBox
        answer={Answer[parseInt(localStorage.getItem("curPage")!)][0]}
      ></SelectBox>
      <SelectBox answer={Answer[curPage][1]}></SelectBox>
      <SelectBox answer={Answer[curPage][2]}></SelectBox>
      <SelectBox answer={Answer[curPage][3]}></SelectBox>
    </div>
  );
};

const QuestionBox = () => {
  return (
    <div>
      {parseInt(localStorage.getItem("curPage")!)}.{"  "}
      {Question[parseInt(localStorage.getItem("curPage")!)]}
    </div>
  );
};

const Question = [
  "이번 주에 내가 가장 많이 느끼는 감정은?",
  "반쪽에게 가장 드러내고 싶지 않은 감정은?",
];

const Answer = [
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

const SelectBox: React.FC<{ answer: string }> = ({ answer }) => {
  return <div className="question-selectbox">{answer}</div>;
};
