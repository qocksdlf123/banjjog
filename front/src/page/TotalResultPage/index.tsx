import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShareLinkImage from "../../assets/GameResultPageAssets/ShareLinkImage.png";
import KakaoImage from "../../assets/GameResultPageAssets/KakaoImage.png";
import SaveImage from "../../assets/GameResultPageAssets/SaveImage.png";
import html2canvas from "html2canvas";

const TotalResultPage = () => {
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default TotalResultPage;

const Header = () => {
  return (
    <div className="totalResult-header bold">
      <div>반쪽 퀴즈 점수</div>
    </div>
  );
};
const Body = () => {
  const myScore = parseInt(localStorage.getItem("myScore")!);
  const yourScore = parseInt(localStorage.getItem("yourScore")!);

  return (
    <div className="totalResult-body">
      <div style={{ color: "#FF9750", marginBottom: "3%" }}>
        반쪽에 대해 누가 더 많이 맞췄을까?
      </div>
      <div style={{ fontSize: "xxx-large" }}>
        {myScore > yourScore
          ? "나의 승리!"
          : myScore != yourScore
          ? "아쉽지만,,졌다"
          : "무승부"}
      </div>
      <div className="totalResult-body-graph">
        <Graph isMy></Graph>
        <Graph isMy={false}></Graph>
      </div>
    </div>
  );
};

const Graph: React.FC<{ isMy: boolean }> = ({ isMy }) => {
  let score = 0;
  if (isMy) {
    let score = (parseInt(localStorage.getItem("myScore")!) * 100) / 100;
    return (
      <div className="totalResult-body-graph-item">
        <div
          style={{
            color: "white",
            backgroundColor: "grey",
            width: "50%",
            textAlign: "center",
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          내 결과
        </div>
        <div
          style={{
            fontSize: "xxx-large",
            marginTop: "auto",
            marginBottom: "10px",
          }}
        >
          {" "}
          {score}
        </div>
        <div
          style={{
            backgroundColor: "#FF9750",
            width: "50%",
            height: `${score}%`,
          }}
        ></div>
      </div>
    );
  }
  score = (parseInt(localStorage.getItem("yourScore")!) * 100) / 100;
  return (
    <div className="totalResult-body-graph-item">
      <div
        style={{
          color: "white",
          backgroundColor: "grey",
          width: "50%",
          textAlign: "center",
          padding: "3px",
          borderRadius: "5px",
        }}
      >
        반쪽 결과
      </div>
      <div
        style={{
          fontSize: "xxx-large",
          marginTop: "auto",
          marginBottom: "10px",
        }}
      >
        {" "}
        {score}
      </div>
      <div
        style={{
          backgroundColor: "#FF9750",
          width: "50%",
          height: `${score}%`,
        }}
      ></div>
    </div>
  );
};

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const history = useNavigate();

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

  const captureScreen = () => {
    const rootElement = document.getElementById("root");

    if (rootElement) {
      html2canvas(rootElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = imgData;
        link.click();
      });
    }
  };

  return (
    <div className="totalResult-footer">
      <div
        style={{ color: "#FF9750", fontSize: "x-large", marginBottom: "10%" }}
      >
        내일도 게임을 해보고 싶다면 카카오톡 플친 추가하기
      </div>
      <div style={{ display: "flex" }}>
        <div className="no-result-footer-iconContainer">
          <img
            className="no-result-footer-icon"
            src={ShareLinkImage}
            onClick={copyToClipboard}
          ></img>
          <div>공유 링크</div>
        </div>
        <div
          onClick={() => (window.location.href = "http://pf.kakao.com/_wXnKG")}
          className="no-result-footer-iconContainer"
        >
          <img className="no-result-footer-icon" src={KakaoImage}></img>
          <div>카톡 채널추가</div>
        </div>
        <div onClick={captureScreen} className="no-result-footer-iconContainer">
          <img className="no-result-footer-icon" src={SaveImage}></img>
          <div>이미지 저장</div>
        </div>
      </div>
      {copied && (
        <div
          style={{ position: "absolute", fontSize: "13px", marginTop: "60%" }}
        >
          복사됨
        </div>
      )}
      <button
        onClick={() => {
          history("/myResult");
        }}
        className="totalResult-footer-nextbtn"
      >
        모든 결과 보기
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
