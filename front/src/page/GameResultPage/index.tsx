import "./style.css";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import ShareLinkImage from "../../assets/GameResultPageAssets/ShareLinkImage.png";
import KakaoImage from "../../assets/GameResultPageAssets/KakaoImage.png";
import Correct from "../../assets/GameResultPageAssets/Correct.png";
import InCorrect from "../../assets/GameResultPageAssets/InCorrect.png";
import NoresultLogo from "../../assets/GameResultPageAssets/NoResultLogo.png";
import { isExistUser } from "../../api/UserAPI";
import { getReply, createReply, addText } from "../../api/ReplyAPI";
import { useRecoilState } from "recoil";
import { myNameState, banjjogNameState } from "../../recoil/atoms";
import Logo from "../../assets/MainPageAssets/Logo.png";
import { myAnswerState, yourAnswerState } from "../../recoil/atoms";
import { userIdState } from "../../recoil/atoms";
import { Answer } from "../QuestionPage";
import { getOpinions, sendTime } from "../../api/ReplyAPI";
import moment from "moment";

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
  const [replyId, setReplyId] = useState<number>(0);
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
      createReply(createReplyInfo)
        .then((res) => {
          setReplyId(res.data.replyId);
          localStorage.setItem("replyId", res.data.replyId.toString());

          sendTime({
            userId: userId,
            day: day,
            type: 1,
            time: localStorage.getItem("startTime")!,
          })
            .then()
            .catch((error) => {
              console.log("errorrrrrr: " + error);
            });

          sendTime({
            userId: userId,
            day: day,
            type: 2,
            time: localStorage.getItem("endTime")!,
          })
            .then()
            .catch((error) => {
              console.log("errorrrrrr2: " + error);
            });
        })
        .catch((error) => {});
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
          <img className="No-Result-Logo" src={NoresultLogo}></img>
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
          <p>
            상대에게 링크를 공유하고 <br />
            결과 비교 보고서를 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
};
const NoResultFooter = () => {
  const [copied, setCopied] = useState(false);
  const userId = parseInt(localStorage.getItem("userId")!);
  const day: number = parseInt(localStorage.getItem("day")!);

  const copyToClipboard = async () => {
    try {
      const currentUrl = "https://otherhalfgame.site";

      await navigator.clipboard.writeText(currentUrl);
      sendTime({
        userId: userId,
        day: day,
        type: 3,
        time: moment().format("YYYY-MM-DDTHH:mm:sszz"),
      })
        .then()
        .catch((error) => {
          console.log("sendTime " + error);
        });
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
        <div>URL</div>
      </div>

      <div
        onClick={() => {
          window.location.href = "http://pf.kakao.com/_wXnKG";
          sendTime({
            userId: userId,
            day: day,
            type: 4,
            time: moment().format("YYYY-MM-DDTHH:mm:sszz"),
          })
            .then()
            .catch((error) => {
              console.log("sendTime " + error);
            });
        }}
        className="no-result-footer-iconContainer"
      >
        <img className="no-result-footer-icon" src={KakaoImage}></img>
        <div>
          카카오톡 <br />
          채널추가
        </div>
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

const Question = [
  [],
  [
    "이번 주에 내가 가장 많이\n 느끼는 감정은?",
    "반쪽에게 가장 드러내고 싶지\n 않은 감정은?",
    "나는 ____ 감정 표현이 서툴다.",
    "반쪽이 조금 더 드러냈으면\n 하는 감정은?",
  ],

  [
    "집 안에서 섹스하기 가장 좋은\n 장소는?",
    "집 밖에서 가장 섹스하기 좋은\n 장소는?",
    "주변에 사람들이 있을 때,\n스릴감을 느끼며 섹스하기 가장\n 좋을 것 같은 장소는?",
    "우리 둘만 있을 때, 섹스하기 \n가장 좋을 것 같은 장소는?",
  ],

  [
    "지금 내 지갑 사정을 반쪽에게\n 공개할 수 있는지?",
    "반쪽과 함께 커플 통장을 쓸때,\n 반쪽이 나 몰래 커플 계좌에 있는\n 돈을 사용한다면?",
    "돈 관련 거짓말 중 내가 용인할 \n수 있는 것은?",
    "반쪽과 지출/저축에 대해 \n이야기해야 하는 빈도는?",
  ],

  [
    "내가 생각하는 가장 이상적인\n 격려는?",
    "내가 가장 좋아하는 격려\n 표현은?",
    "응원과 지지를 받았을 때 \n나의 기분은?",
    "내가 제일 격려와 응원을 받고\n 싶은 영역은?",
  ],

  [
    "섹스를 하기에 가장 좋은\n 시간은?",
    "애무 포함 가장 적당한 섹스\n 시간은?",
    "섹스할 때 가장 좋은 배경음은?",
    "섹스할 때 가장 좋은 분위기는?",
  ],

  [
    "나와 반쪽에게 데이트에 쓸 수\n 있는 8만원이 있다면?",
    "오늘 하루를 특별하게 만들기\n 위한 지출 영역은?",
    "나와 반쪽이 데이트 비용 문제로\n 가장 겪을 법한 갈등은?",
    "데이트 통장 개설 시 가장\n 고려해야 할 점은?",
  ],
];

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
        <div style={{ fontSize: "3.6vw" }}>연인에 대한 당신의 답</div>
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
            fontSize: "2.8vw",
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
        <div style={{ fontSize: "3.6vw" }}>당신에 대한 연인의 답</div>
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
            fontSize: "2.8vw",
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
  const userId = parseInt(localStorage.getItem("userId")!);
  const day: number = parseInt(localStorage.getItem("day")!);

  const copyToClipboard = async () => {
    try {
      const currentUrl = "https://otherhalfgame.site";

      await navigator.clipboard.writeText(currentUrl);
      sendTime({
        userId: userId,
        day: day,
        type: 3,
        time: moment().format("YYYY-MM-DDTHH:mm:sszz"),
      })
        .then()
        .catch((error) => {
          console.log("sendTime " + error);
        });

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
      <div className="no-result-footer-iconContainer-2">
        <img
          className="result-footer-icon"
          src={ShareLinkImage}
          onClick={copyToClipboard}
        ></img>
        <div>공유 링크</div>
      </div>
      <div
        onClick={() => {
          window.location.href = "http://pf.kakao.com/_wXnKG";
          sendTime({
            userId: userId,
            day: day,
            type: 4,
            time: moment().format("YYYY-MM-DDTHH:mm:sszz"),
          })
            .then()
            .catch((error) => {
              console.log("sendTime " + error);
            });
        }}
        className="no-result-footer-iconContainer-2"
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
  const replyIdString = localStorage.getItem("replyId");
  const replyId = replyIdString ? parseInt(replyIdString) : 0;
  const [text, setText] = useState<string>("");
  const textInfo = {
    replyId: replyId!,
    text: text,
  };
  const userId = parseInt(localStorage.getItem("userId")!);
  const day = parseInt(localStorage.getItem("day")!);

  useEffect(() => {
    getOpinions(userId).then((response) => {
      console.log(response);
      const item = response.data.find((item) => item.day === day);
      console.log(item);

      if (item != null && item.text != "") {
        setText(item.text);
      }
    });
  }, []);
  const endbtn = () => {
    if (text != "") {
      addText(textInfo)
        .then()
        .catch((error) => {});
    }
    history("/totalResult");
  };
  const handleTextChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(event.target.value); //  입력값으로 상태 업데이트
  };
  return (
    <div className="result-footer">
      <div className="result-footer-memobox">
        <div className="result-footer-inputbox-text">
          [입력란] 내 반쪽에 대해 새롭게 알게 된 점을 남겨볼까요? (100자 이내)
        </div>
        {/*         <input
          placeholder="서로 새롭게 알게 된 점을 다음 페이지에서 모아 볼 수 있어요. "
          className="result-footer-inputbox"
        ></input> */}
        <textarea
          placeholder="서로 새롭게 알게 된 점을 다음 페이지에서 모아 볼 수 있어요."
          className="result-footer-inputbox"
          value={text}
          onChange={handleTextChange}
        ></textarea>
      </div>
      <button onClick={endbtn} className="result-footer-end-btn">
        입력 완료
      </button>
    </div>
  );
};
