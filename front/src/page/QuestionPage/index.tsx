import "./style.css";
import UnLock from "../../assets/GameListPageAssets/UnLock.png";
import Lock from "../../assets/GameListPageAssets/Lock.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { countPage } from "../../recoil/atoms";
import { countTotalPage } from "../../recoil/atoms";
import { endResponse } from "../../recoil/atoms";
interface QuestionProps {
  day: number;
}

const QuestionPage = () => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const [isEndResponse, setIsEndResponse] =
    useRecoilState<boolean>(endResponse);

  useEffect(() => {
    localStorage.setItem("totalPage", "10");
  }, []);
  if (isEndResponse && curPage > 4) {
    return (
      <div className="webapp-box">
        <TempBody></TempBody>
        <TempFooter></TempFooter>
      </div>
    );
  }
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default QuestionPage;

const TempBody = () => {
  return (
    <div className="question-tempBody">
      이제 내가 생각하는 연인(반쪽)에 대해서 맞춰 보아요!
    </div>
  );
};

const TempFooter = () => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);

  const next = () => {
    setCurPage(1);
  };

  return (
    <div className="question-tempFooter">
      <button onClick={next} className="main-start-btn">
        시작하기
      </button>
    </div>
  );
};

const Header = () => {
  const day = parseInt(localStorage.getItem("day")!);
  const subject = subjects[(day - 1) / 3];
  return (
    <div className="question-header">
      <div className="question-header-title">
        <div>
          Day {day}. {subject}
        </div>
        <PageNum totalPage={4} />
      </div>
      <ProgressBar total={4}></ProgressBar>
    </div>
  );
};

const subjects = ["소통", "성&사랑", "경제&생활"];

const PageNum: React.FC<{ totalPage: number }> = ({ totalPage }) => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  return (
    <div>
      {curPage} / {totalPage}
    </div>
  );
};

interface ProgressBarProps {
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total }) => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const progress = (curPage * 100) / total;

  return (
    <div style={{ border: "1px solid #ccc", width: "80%" }}>
      <div
        style={{
          width: `${progress}%`,
          height: "2vh",
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
      <SelectBox num={0}></SelectBox>
      <SelectBox num={1}></SelectBox>
      <SelectBox num={2}></SelectBox>
      <SelectBox num={3}></SelectBox>
    </div>
  );
};

const QuestionBox = () => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const [isEndResponse, setIsEndResponse] =
    useRecoilState<boolean>(endResponse);

  return (
    <div>
      {curPage}.{"  "}
      {isEndResponse ? OppQuestion[curPage] : Question[curPage]}
    </div>
  );
};

const Question = [
  "",
  "이번 주에 내가 가장 많이 느끼는 감정은?",
  "반쪽에게 가장 드러내고 싶지 않은 감정은?",
  "나는 ____ 감정 표현이 서툴다.",
  "반쪽이 조금 더 드러냈으면 하는 감정은?",
];

const OppQuestion = [
  "",
  "이번 주에 반쪽이 가장 많이 느끼는 감정은?",
  "반쪽이 가장 드러내고 싶지 않은 감정은?",
  "반쪽은 ____ 감정 표현이 서툴다.",
  "반쪽이 볼 때, 내가 반쪽에게 조금 더 드러냈으면 하는 감정은?",
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

const SelectBox: React.FC<{ num: number }> = ({ num }) => {
  const history = useNavigate();
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const [totalPage, setTotalPage] = useRecoilState<number>(countTotalPage);
  const [isEndResponse, setIsEndResponse] =
    useRecoilState<boolean>(endResponse);

  return (
    <div
      onClick={() => {
        if (curPage == totalPage) {
          setCurPage((preValue) => preValue + 1);
          if (isEndResponse) {
            history("/gameResult");
          } else {
            setIsEndResponse(true);
          }
        } else {
          setCurPage((preValue) => preValue + 1);
        }
      }}
      className="question-selectbox"
    >
      {Answer[curPage][num]}
    </div>
  );
};
