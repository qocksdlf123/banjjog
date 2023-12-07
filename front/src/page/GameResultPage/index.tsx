import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShareLinkImage from "../../assets/GameResultPageAssets/ShareLinkImage.png";
import KakaoImage from "../../assets/GameResultPageAssets/KakaoImage.png";
import Correct from "../../assets/GameResultPageAssets/Correct.png";
import InCorrect from "../../assets/GameResultPageAssets/Incorrect.png";

const GameResultPage = () => {
  const isResult: boolean = true;
  if (isResult) {
    return (
      <div className="webapp-box">
        <ResultHeader></ResultHeader>
        <ResultBody></ResultBody>
        <ResultFooter></ResultFooter>
      </div>
    );
  } else {
    return (
      <div className="webapp-box">
        <NoResultHeader></NoResultHeader>
        <NoResultBody></NoResultBody>
        <NoResultFooter></NoResultFooter>
      </div>
    );
  }
};

export default GameResultPage;

const NoResultHeader = () => {
  return (
    <div className="no-result-header">
      <div>연인과의 비교 결과를 확인할 수 없습니다.</div>
    </div>
  );
};
const NoResultBody = () => {
  return (
    <div className="no-result-body">
      <div className="no-result-body-textbox">
        <div>
          <p>앗.. 상대방이 응답을 하지 않았네요!</p>
          <p>상대에게 공유하고 결과 비교 보고서를 확인해보세요</p>
        </div>
      </div>
    </div>
  );
};
const NoResultFooter = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error("링크 복사에 실패했습니다:", err);
    }
  };

  return (
    <div className="no-result-footer">
      <div className="no-result-footer-iconContainer">
        <img
          className="no-result-footer-icon"
          src={ShareLinkImage}
          onClick={copyToClipboard}
        ></img>
        <div>공유 링크</div>
      </div>
      <div className="no-result-footer-iconContainer">
        <img className="no-result-footer-icon" src={KakaoImage}></img>
        <div>카카오톡 채널추가</div>
      </div>
      {copied && (
        <div
          style={{ position: "absolute", fontSize: "13px", marginTop: "60%" }}
        >
          복사됨
        </div>
      )}
    </div>
  );
};

const ResultHeader = () => {
  return (
    <div className="result-header bold">
      <div>결과 비교 보고서</div>
    </div>
  );
};

const ResultBody = () => {
  return (
    <div className="result-body">
      <ResultContainer></ResultContainer>
      <ResultContainer></ResultContainer>
      <ResultContainer></ResultContainer>
      <ResultContainer></ResultContainer>
      <ResultContainer></ResultContainer>
    </div>
  );
};

const ResultContainer = () => {
  return (
    <div className="result-body-container">
      <div>Q1. {Question[1]}</div>
      <div className="result-body-answer-container">
        <AnswerContainer isMe></AnswerContainer>
        <AnswerContainer isMe={false}></AnswerContainer>
      </div>
    </div>
  );
};
const AnswerContainer: React.FC<{ isMe: boolean }> = ({ isMe }) => {
  if (isMe) {
    return (
      <div
        className="result-body-answer"
        style={{ backgroundColor: "#FFEED9" }}
      >
        <div>연인에 대한 당신의 답</div>
        <img className="result-body-answer-image" src={Correct} alt="" />
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          Answer[1]
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="result-body-answer"
        style={{ backgroundColor: "#FFCD8C" }}
      >
        <div>당신에 대한 연인의 답</div>
        <img className="result-body-answer-image" src={Correct} alt="" />
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          Answer[1]
        </div>
      </div>
    );
  }
};

const ResultFooter = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error("링크 복사에 실패했습니다:", err);
    }
  };

  const history = useNavigate();
  const endbtn = () => {
    history("/myResult");
  };

  return (
    <div className="result-footer">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="no-result-footer-iconContainer">
          <img
            className="result-footer-icon"
            src={ShareLinkImage}
            onClick={copyToClipboard}
          ></img>
          <div>공유 링크</div>
        </div>
        <div className="no-result-footer-iconContainer">
          <img className="result-footer-icon" src={KakaoImage}></img>
          <div>카카오톡 채널추가</div>
        </div>

        {copied && (
          <div
            style={{ position: "absolute", fontSize: "13px", marginTop: "60%" }}
          >
            복사됨
          </div>
        )}
      </div>
      <div className="result-footer-memobox">
        <div className="result-footer-inputbox-text">
          [입력란] 내 반쪽에 대해 새롭게 알게 된 점을 남겨볼까요? (100자 이내)
        </div>
        <input
          placeholder="서로 새롭게 알게 된 점을 다음 페이지에서 모아 볼 수 있어요. "
          className="result-footer-inputbox"
        ></input>
      </div>
      <button onClick={endbtn} className="result-footer-end-btn">
        입력 완료
      </button>
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
