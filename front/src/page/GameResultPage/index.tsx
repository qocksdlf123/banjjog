import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShareLinkImage from "../../assets/GameResultPageAssets/ShareLinkImage.png";
import KakaoImage from "../../assets/GameResultPageAssets/KakaoImage.png";
import Correct from "../../assets/GameResultPageAssets/Correct.png";
import InCorrect from "../../assets/GameResultPageAssets/InCorrect.png";
import { isExistUser } from "../../api/UserAPI";
import { getReply, createReply } from "../../api/ReplyAPI";
import { useRecoilState } from "recoil";
import { myNameState, banjjogNameState } from "../../recoil/atoms";
import Logo from "../../assets/MainPageAssets/Logo.png";
import { myAnswerState, yourAnswerState } from "../../recoil/atoms";
import { userIdState } from "../../recoil/atoms";
import { Question, Answer } from "../QuestionPage";

const GameResultPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isResult, setIsResult] = useState<boolean>(false);
  const myName = localStorage.getItem("myName");
  const yourName = localStorage.getItem("yourName");
  const day: number = parseInt(localStorage.getItem("day")!);
  const [myAnswer, setMyAnswer] = useRecoilState<string>(myAnswerState);
  const [yourAnswer, setYourAnswer] = useRecoilState<string>(yourAnswerState);

  const userId = parseInt(localStorage.getItem("userId")!);
  const [oppMyAnswer, setOppMyAsnwer] = useState<string>("");
  const [oppYourAnswer, setOppYourAsnwer] = useState<string>("");

  const userInfo = {
    myName: yourName!,
    yourName: myName!,
  };
  const createReplyInfo = {
    userId: userId,
    day: day,
    myReply: myAnswer!,
    predictedReply: yourAnswer!,
  };
  useEffect(() => {
    console.log("answer : " + myAnswer);
    console.log("yanswer : " + yourAnswer);

    if (myAnswer) {
      createReply(createReplyInfo).catch((error) => {});
    }
    isExistUser(userInfo).then((response) => {
      if (response.data == 0) {
        console.log("상대응답 없음");
        setIsLoading(false);
      } else {
        localStorage.setItem("oppUserId", response.data.toString());
        getReply({ userId: response.data, day: day })
          .then((res) => {
            setOppMyAsnwer(res.data.myReply);
            setOppYourAsnwer(res.data.predictedReply);
            getReply({ userId: userId, day: day }).then((myreply) => {
              setMyAnswer(myreply.data.myReply);
              setYourAnswer(myreply.data.predictedReply);
            });
            setIsResult(true);
          })
          .catch((error) => {
            console.log("getReply error : " + error);
          });
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="webapp-box">
        <LoadingHeader></LoadingHeader>
        <LoadingBody></LoadingBody>
        <LoadingFooter></LoadingFooter>
      </div>
    );
  } else {
    if (isResult) {
      return (
        <div className="webapp-box">
          <ResultHeader></ResultHeader>
          <ResultBody
            day={day}
            oppMyAnswer={oppMyAnswer}
            oppYourAnswer={oppYourAnswer}
          ></ResultBody>
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
  }
};

export default GameResultPage;

const LoadingHeader = () => {
  return <div className="loading-header">결과 로딩중...</div>;
};

const LoadingBody = () => {
  return (
    <div className="loading-body">
      <img className="loading-body-logo" src={Logo}></img>
    </div>
  );
};

const LoadingFooter = () => {
  return (
    <div className="loading-footer">
      내일도 게임을 해보고 싶다면 <br /> 카카오톡에서 ‘반쪽이’ 검색
    </div>
  );
};

const NoResultHeader = () => {
  return (
    <div className="no-result-header">
      <div>
        연인과의 비교 결과를 <br /> 확인할 수 없습니다.
      </div>
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

      <div
        onClick={() => (window.location.href = "http://pf.kakao.com/_wXnKG")}
        className="no-result-footer-iconContainer"
      >
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

const ResultBody: React.FC<{
  day: number;
  oppMyAnswer: string;
  oppYourAnswer: string;
}> = ({ day, oppMyAnswer, oppYourAnswer }) => {
  return (
    <div className="result-body">
      <ResultContainer
        day={day}
        question={1}
        oppMyAnswer={oppMyAnswer}
        oppYourAnswer={oppYourAnswer}
      ></ResultContainer>
      <ResultContainer
        day={day}
        question={2}
        oppMyAnswer={oppMyAnswer}
        oppYourAnswer={oppYourAnswer}
      ></ResultContainer>
      <ResultContainer
        day={day}
        question={3}
        oppMyAnswer={oppMyAnswer}
        oppYourAnswer={oppYourAnswer}
      ></ResultContainer>
      <ResultContainer
        day={day}
        question={4}
        oppMyAnswer={oppMyAnswer}
        oppYourAnswer={oppYourAnswer}
      ></ResultContainer>
      <ShareIcon />
    </div>
  );
};

interface ResultContainerProps {
  day: number;
  question: number;
  oppMyAnswer: string;
  oppYourAnswer: string;
}
const ResultContainer: React.FC<ResultContainerProps> = ({
  day,
  question,
  oppMyAnswer,
  oppYourAnswer,
}) => {
  return (
    <div className="result-body-container">
      <div>
        Q.{question} {Question[day][question - 1]}
      </div>
      <div className="result-body-answer-container">
        <AnswerContainer
          isMy
          day={day}
          question={question}
          oppMyAnswer={oppMyAnswer}
          oppYourAnswer={oppYourAnswer}
        ></AnswerContainer>
        <AnswerContainer
          isMy={false}
          day={day}
          question={question}
          oppMyAnswer={oppMyAnswer}
          oppYourAnswer={oppYourAnswer}
        ></AnswerContainer>
      </div>
    </div>
  );
};

interface AnswerContainerProps {
  isMy: boolean;
  day: number;
  question: number;
  oppMyAnswer: string;
  oppYourAnswer: string;
}
const AnswerContainer: React.FC<AnswerContainerProps> = ({
  isMy,
  day,
  question,
  oppMyAnswer,
  oppYourAnswer,
}) => {
  const [myAnswer, setMyAnswer] = useRecoilState<string>(myAnswerState);
  const [yourAnswer, setYourAnswer] = useRecoilState<string>(yourAnswerState);

  const MyAnswers = myAnswer.split(",");
  const YourAnswers = yourAnswer.split(",");
  const OppMyAnswers = oppMyAnswer.split(",");
  const OppYourAnswers = oppYourAnswer.split(",");

  useEffect(() => {
    let myScore = 0;
    let yourScore = 0;
    for (let i = 0; i < 4; i++) {
      if (YourAnswers[i] === OppMyAnswers[i]) {
        myScore += 25;
      }
      if (OppYourAnswers[i] === MyAnswers[i]) {
        yourScore += 25;
      }
    }
    localStorage.setItem("myScore", myScore.toString());
    localStorage.setItem("yourScore", yourScore.toString());
  }, []);

  if (isMy) {
    return (
      <div
        className="result-body-answer"
        style={{ backgroundColor: "#FFEED9" }}
      >
        <div>연인에 대한 당신의 답</div>
        {YourAnswers[question - 1] == OppMyAnswers[question - 1] ? (
          <img className="result-body-answer-image" src={Correct} alt="" />
        ) : (
          <img className="result-body-answer-image" src={InCorrect} alt="" />
        )}
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          {Answer[day][question - 1][parseInt(YourAnswers[question - 1]) - 1]}
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
        {OppYourAnswers[question - 1] == MyAnswers[question - 1] ? (
          <img className="result-body-answer-image" src={Correct} alt="" />
        ) : (
          <img className="result-body-answer-image" src={InCorrect} alt="" />
        )}
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            textAlign: "center",
            overflow: "scroll",
          }}
        >
          {
            Answer[day][question - 1][
              parseInt(OppYourAnswers[question - 1]) - 1
            ]
          }
        </div>
      </div>
    );
  }
};
const ShareIcon = () => {
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="no-result-footer-iconContainer">
        <img
          className="result-footer-icon"
          src={ShareLinkImage}
          onClick={copyToClipboard}
        ></img>
        <div>공유 링크</div>
      </div>
      <div
        onClick={() => (window.location.href = "http://pf.kakao.com/_wXnKG")}
        className="no-result-footer-iconContainer"
      >
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
  );
};

const ResultFooter = () => {
  const history = useNavigate();
  const endbtn = () => {
    history("/totalResult");
  };

  return (
    <div className="result-footer">
      <div className="result-footer-memobox">
        <div className="result-footer-inputbox-text">
          [입력란] 내 반쪽에 대해 새롭게 알게 된 점을
          <br /> 남겨볼까요? (100자 이내)
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