import "./style.scss";
import UnLock from "../../assets/GameListPageAssets/UnLock.png";
import Lock from "../../assets/GameListPageAssets/Lock.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { countPage } from "../../recoil/atoms";
import { countTotalPage } from "../../recoil/atoms";

interface QuestionProps {
  day: number;
}

const QuestionPage = () => {
  useEffect(() => {
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
        <PageNum totalPage={4} />
      </div>
      <ProgressBar total={4}></ProgressBar>
    </div>
  );
};

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
      <SelectBox num={0}></SelectBox>
      <SelectBox num={1}></SelectBox>
      <SelectBox num={2}></SelectBox>
      <SelectBox num={3}></SelectBox>
    </div>
  );
};

const QuestionBox = () => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);

  return (
    <div>
      {curPage}.{"  "}
      {Question[curPage]}
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

  return (
    <div
      onClick={() => {
        if (curPage == totalPage) {
          history("/gameResult");
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
