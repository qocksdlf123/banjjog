import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { countPage } from "../../recoil/atoms";
import { countTotalPage } from "../../recoil/atoms";
import { endResponse } from "../../recoil/atoms";
import { myAnswerState, yourAnswerState } from "../../recoil/atoms";

const QuestionPage = () => {
  const [isExplain, setIsExplain] = useState<boolean>(true);
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const [isEndResponse, setIsEndResponse] =
    useRecoilState<boolean>(endResponse);
  const [myAnswer, setMyAnswer] = useRecoilState<string>(myAnswerState);
  const [yourAnswer, setYourAnswer] = useRecoilState<string>(yourAnswerState);

  const handleChange = (newValue: boolean) => {
    setIsExplain(newValue);
  };

  useEffect(() => {
    setIsEndResponse(false);
    setCurPage(1);
    setMyAnswer("");
    setYourAnswer("");
  }, []);

  if (isExplain) {
    return (
      <div className="webapp-box">
        <ExplainHeader></ExplainHeader>
        <ExplainBody></ExplainBody>
        <ExplainFooter handleChange={handleChange}></ExplainFooter>
      </div>
    );
  }
  if (isEndResponse && curPage < 5) {
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

const GameList = [
  "",
  "Day 1: 소통 \n우리의 감정 맞춰보기",
  "Day 2: 성&사랑 \n판타지 속 ‘장소’ \n탐색하기",
  "Day 3: 경제&생활 \n주머니 사정 공개 가능?",
  "Day 4: 소통 \n우리의 격려 유형은?",
  "Day 5: 성&사랑 \n판타지 속 ‘분위기’ \n탐색하기",
  "Day 6: 경제&생활 \n데이트 비용에 관하여",
];

const Explain = [
  [],
  [
    "최근 우리가 느끼는 감정은?\n서로의 감정 맞춰보기!",
    "연인 간 감정 공유는 중요하지만\n 정말 어려운 부분 중 하나입니다.\n나와 내 반쪽의 최근 감정 상태와\n 주로 드러내고 싶/싶지 않은\n 감정은 무엇일까요?\n 서로의 감정을 얼마나 잘\n 알고 있는지, 감정 공유가 충분한지 알아보는\n 시간을 가져 보아요.",
  ],
  [
    "내가 생각하는 \n가장 이상적인 관계는?\n 판타지 속 장소 탐색하기",
    "성적 판타지는 대부분 하나쯤은\n 가지고 있는 은밀하고도\n 보편적인 개념입니다.\n 나와 내 반쪽의 성적 판타지는\n 어떤지 알아보는 시간의\n 첫 번째 주제 - 장소입니다!\n 서로 사랑을 나눌 때 어떤 장소가\n 제일 좋은지 알아보는\n 시간을 가져볼까요?",
  ],
  [
    "내 주머니 사정을 반쪽과 \n어디까지 공유할 수 있나요",
    "연인 사이에 돈 문제만큼\n 민감한 주제가 없을 거예요.\n각자의 재정상황에 대한\n 이야기를 솔직하게 얘기하는\n 기회를 가져보면 어떨까요?\n함께 서로의 주머니 사정을\n 알아보아요.",
  ],
  [
    "나와 반쪽의 격려 유형은?",
    "연인 간 격려는 정서적\n 지지의 중요한 부분이며,\n 관계 만족도에 큰\n 영향을 미칩니다.\n서로가 선호하는 격려는\n 어떤 건지, 어떤 표현을 격려로\n 생각하는지 알아보아요.",
  ],
  [
    "내가 생각하는\n 가장 이상적인 관계는?\n 판타지 속 분위기 탐색하기",
    "성적 판타지는 대부분 하나쯤은\n 가지고 있는 은밀하고도\n 보편적인 개념입니다.\n나와 내 반쪽의 성적 판타지는\n 어떤지 알아보는 시간의\n두번째 주제 - 분위기 입니다!\n서로 사랑을 나눌 때 어떤 분위기가\n 제일 좋은지 알아보는 시간을\n 가져볼까요?",
  ],
  [
    "나와 반쪽은 데이트 비용을\n 어떻게 생각하고 있을까요?",
    "데이트는 단순히 마음만 갖고\n 하기엔 현실적으로 한계가 있죠.\n그렇기 때문에 필연적으로\n 발생할 수밖에 없는 데이트\n 비용을 두고 연인끼리 생각하는\n 바가 다를 수 있을텐데요.\n데이트 비용을 생각하는 서로의\n 마음이 어떤지 확인해볼까요?",
  ],
];

const ExplainHeader = () => {
  const day = parseInt(localStorage.getItem("day")!);

  return <div className="question-explain-header bold">{GameList[day]}</div>;
};

const ExplainBody = () => {
  const day = parseInt(localStorage.getItem("day")!);

  return (
    <div className="question-explain-body">
      <div className="question-explain-body-main">{Explain[day][0]}</div>
      <div className="question-explain-body-explain">{Explain[day][1]}</div>
    </div>
  );
};

const ExplainFooter: React.FC<{
  handleChange: (newValue: boolean) => void;
}> = ({ handleChange }) => {
  const startGame = () => {
    handleChange(false);
  };
  return (
    <div className="question-explain-footer">
      <button onClick={startGame} className="main-start-btn">
        시작하기
      </button>
    </div>
  );
};

const TempBody = () => {
  return (
    <div className="question-tempBody">
      이제 내가 생각하는
      <br /> 연인(반쪽)에 대해서
      <br /> 맞춰 보아요!
    </div>
  );
};

const TempFooter = () => {
  const [curPage, setCurPage] = useRecoilState<number>(countPage);

  const next = () => {
    setCurPage(5);
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
  const subject = subjects[day - 1];
  return (
    <div className="question-header">
      <div className="question-header-title">
        <div>
          Day {day}. {subject}
        </div>
        <PageNum totalPage={8} />
      </div>
      <ProgressBar total={8}></ProgressBar>
    </div>
  );
};

const subjects = [
  "소통",
  "성&사랑",
  "경제&생활",
  "소통",
  "성&사랑",
  "경제&생활",
];

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
  const day: number = parseInt(localStorage.getItem("day")!);
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const [isEndResponse, setIsEndResponse] =
    useRecoilState<boolean>(endResponse);

  return (
    <div>
      {curPage}.{"  "}
      {isEndResponse
        ? OppQuestion[day][curPage % 5]
        : Question[day][curPage - 1]}
    </div>
  );
};

export const Question = [
  [],
  [
    "이번 주에 내가 가장\n 많이 느끼는 감정은?",
    "반쪽에게 가장 드러내고\n 싶지 않은 감정은?",
    "나는 ____ 감정\n 표현이 서툴다.",
    "반쪽이 조금 더 \n드러냈으면 하는 감정은?",
  ],

  [
    "집 안에서 섹스하기\n 가장 좋은 장소는?",
    "집 밖에서 가장 섹스하기\n좋은 장소는?",
    "주변에 사람들이 있을 때,\n스릴감을 느끼며 섹스하기 가장 좋을 것 같은 장소는?",
    "우리 둘만 있을 때,\n섹스하기 가장 좋을 것\n 같은 장소는?",
  ],

  [
    "지금 내 지갑 사정을 \n반쪽에게 공개할 수 있는지?",
    "반쪽과 함께 커플\n 통장을 쓸때, 반쪽이 \n나 몰래 커플 계좌에 있는\n 돈을 사용한다면?",
    "돈 관련 거짓말 중 내가\n 용인할 수 있는 것은?",
    "반쪽과 지출/저축에 \n대해 이야기해야\n 하는 빈도는?",
  ],

  [
    "내가 생각하는 가장 \n이상적인 격려는?",
    "내가 가장 좋아하는 \n격려 표현은?",
    "응원과 지지를 받았을 때 \n나의 기분은?",
    "내가 제일 격려와 응원을 \n받고 싶은 영역은?",
  ],

  [
    "섹스를 하기에 가장 \n좋은 시간은?",
    "애무 포함 가장 적당한\n섹스 시간은?",
    "섹스할 때 가장 좋은 \n배경음은?",
    "섹스할 때 가장 좋은 \n분위기는?",
  ],

  [
    "나와 반쪽에게 데이트에\n 쓸 수 있는 8만원이 있다면?",
    "오늘 하루를 특별하게\n 만들기 위한 지출 영역은?",
    "나와 반쪽이 데이트 비용\n 문제로 가장 겪을 법한\n 갈등은?",
    "데이트 통장 개설 시\n 가장 고려해야 할 점은?",
  ],
];

const OppQuestion = [
  [],
  [
    "이번 주에 반쪽이 가장 많이 느끼는 감정은?",
    "반쪽이 가장 드러내고 싶지 않은 감정은?",
    "반쪽은 ____ 감정 표현이 서툴다.",
    "반쪽이 볼 때, 내가 반쪽에게 조금 더 드러냈으면 하는 감정은?",
  ],
  [
    "반쪽이 생각했을 때, 집 안에서 섹스하기 가장 좋은 장소는?",
    "반쪽이 생각했을 때, 집 밖에서 가장 섹스하기 좋은 장소는?",
    "반쪽이 생각했을 때, 주변에 사람들이 있을 때, 스릴감을 느끼며 섹스하기 가장 좋을 것 같은 장소는?",
    "반쪽이 생각했을 때, 우리 둘만 있을 때, 섹스하기 가장 좋을 것 같은 장소는?",
  ],

  [
    "반쪽은 지금 내게 지갑 사정을 공개할 수 있다고 생각하는지?",
    "반쪽과 함께 커플 통장을 쓸때, 내가 반쪽 몰래 커플 계좌에 있는 돈을 사용한다면 반쪽의 반응은?",
    "돈 관련 거짓말 중 반쪽이 용인해줄 수 있는 것은?",
    "반쪽이 생각했을 때, 지출/저축에 대해 이야기해야 하는 빈도는?",
  ],

  [
    "반쪽이 생각하는 가장 이상적인 격려는?",
    "반쪽이 가장 좋아하는 격려 표현은?",
    "응원과 지지를 받았을 때 반쪽의 기분은?",
    "반쪽이 격려와 응원을 제일 받고 싶어할 영역은?",
  ],

  [
    "반쪽이 생각할 때, 섹스를 하기에 가장 좋은 시간은?",
    "반쪽이 생각할 때, 애무 포함 가장 적당한 섹스 시간은?",
    "반쪽이 생각할 때, 섹스할 때 가장 좋은 배경음은?",
    "반쪽이 생각할 때, 섹스할 때 가장 좋은 분위기는?",
  ],

  [
    "반쪽이 생각할 때, 나와 반쪽에게 데이트에 쓸 수 있는 8만원이 있다면?",
    "반쪽이 생각할 때, 오늘 하루를 특별하게 만들기 위한 지출 영역은?",
    "반쪽이 생각할 때, 나와 반쪽이 데이트 비용 문제로 가장 겪을 법한 갈등은?",
    "반쪽이 생각할 때, 데이트 통장 개설 시 가장 고려해야 할 점은?",
  ],
];

export const Answer = [
  [],
  [
    ["신남", "우울", "안정", "흥분"],
    ["우울", "걱정", "초조", "실망"],
    ["고마움", "기쁨", "슬픔", "아쉬움"],
    ["고마움", "기쁨", "슬픔", "아쉬움"],
  ],

  [
    [
      "안방 (침대)",
      "주방 (탁자, 식탁)",
      "돌아가고 있는 세탁기 위",
      "화장실 \n(욕조, 세면대, 샤워부스)",
    ],
    ["온천", "비상 계단", "비행기/열차 화장실", "엘리베이터"],
    ["대관람차 안", "공원 벤치 위", "영화관", "공중화장실 안"],
    [
      "조용한 골목길에 주차된 차 안",
      "햇볕에 내리쬐는 해변\n 모래사장 위",
      "모두가 퇴근한 시간,\n 회사 사무실",
      "모닥불 옆 포근한 텐트 속",
    ],
  ],

  [
    [
      "얼마든지 보여줄 수 있음",
      "지갑이 빵빵할 때 보여줄 수\n 있음",
      "든 게 너무 없어서 보여줄 수 \n없음",
      "개인정보라 보여줄 수 \n없음",
    ],
    [
      "신의를 져버린 행동이니\n 결별 사유가 될 수도",
      "자초지종을 듣고 납득할 수 있는\n 이유라면 참작 가능",
      "사용하고 다시 채워 넣는다면\n 문제될 것 없음",
      "나도 똑같이 커플 계좌 \n잔고를 사용할 것",
    ],
    [
      "배달 온 떡볶이 값을\n 거짓말해서 차익 챙기기",
      "다른 사람에게 선물 받은 것을 \n내게 선물하면서 아무 말 하지 않기",
      "소득을 거짓말해 커플 통장에\n 넣는 자기 예금 축소시키기",
      "거짓말은 단 하나도 허용할 수\n 없다😠!",
    ],
    [
      "일주일에 한 번씩",
      "한 달에 한 번씩",
      "지출 또는 저축이 \n필요할 때마다 얘기하기",
      "연인 사이에 돈 얘기는 \n하지 않아도 됨",
    ],
  ],

  [
    [
      "만났을 때 수고했다고 \n안아주는 반쪽",
      "힘든 하루의 끝 가장 좋아하는\n 간식을 포장해 놓은 반쪽",
      "내 기분을 좋게 하기 위해 \n‘Cheer up’ 춤을 추는 반쪽",
      "나를 위해 현실적인 조언을 \n해주는 반쪽",
    ],
    [
      "파이팅!!",
      "평소처럼만 하면 돼",
      "모든 것이 잘 될 거야",
      "노력하는 네가 멋지다",
    ],
    [
      "벅차올라서 이미 성공한 기분🤩",
      "기분이 좋아🙂 피식 \n미소가 나온다",
      "마음 깊은 곳으로부터 \n우러나오는 고마움",
      "조금은 부담스럽다…부끄러움",
    ],
    ["가족 관계", "커리어적 성장", "친구 관계", "자존감"],
  ],

  [
    ["오전 9시", "오후 2시", "오후 8시", "새벽 1시"],
    ["짧고 굵게 15분 미만", , "30분", "1시간", "아주 아주 길게"],
    ["잔잔한 클래식", "약간 신나는 재즈 음악", "몽환적인 발라드", "배경음"],
    [
      "광활한 자연에서의 탁 트인 느낌",
      "언제든지 누군가에게 들킬 수\n 있다는 스릴감",
      "우리 둘만의 아늑한 아지트에서\n 나누는 따뜻함",
      "다른 사람들 앞에서 \n대담하게 터치",
    ],
  ],

  [
    [
      "부담 없이 하루 놀기에 적절해요",
      "적당하지만, 기념일에는 \n모자라요",
      "평범한 날에도 모자랄 것 같아요",
      "내일까지도 쓸 수 있는 \n충분한 금액!",
    ],
    [
      "맛집🤤 탐방 식사 비용",
      "문화 생활을 위한 영화/공연",
      "오늘 같이 있을래? 숙박 비용",
      "서로를 위한 선물🎁 쇼핑 비용",
    ],
    [
      "계산할 때가 되니 \n사라져버린 반쪽",
      "현금 계산으로 동전까지 \n일일이 세는 반쪽",
      "내가 결제를 못 했을 때 밀린 \n비용을 월급날 맞춰 청구하는 반쪽",
      "모든 비용을 본인이 \n부담하겠다는 반쪽",
    ],
    [
      "나와 반쪽의 소득 수준에 맞는\n 예끔 금액 설정",
      "데이트 통장 개설 자체에 반대",
      "둘 중 한 명의 납부 금액 연체 시\n 조치 내용 결정",
      "데이트 통장 해지 시 잔고 금액\n 분할 비율 결정",
    ],
  ],
];

const SelectBox: React.FC<{ num: number }> = ({ num }) => {
  const history = useNavigate();
  const day: number = parseInt(localStorage.getItem("day")!);
  const [curPage, setCurPage] = useRecoilState<number>(countPage);
  const [isEndResponse, setIsEndResponse] =
    useRecoilState<boolean>(endResponse);
  const [myAnswer, setMyAnswer] = useRecoilState<string>(myAnswerState);
  const [yourAnswer, setYourAnswer] = useRecoilState<string>(yourAnswerState);

  const numbering =
    num == 0 ? "a. " : num == 1 ? "b. " : num == 2 ? "c. " : "d. ";

  return (
    <div
      onClick={() => {
        if (curPage <= 4) {
          setMyAnswer((pre) => pre + "," + (num + 1));
        } else {
          setYourAnswer((pre) => pre + "," + (num + 1));
        }

        if (curPage == 8) {
          setMyAnswer((pre) => pre.substring(1));
          setYourAnswer((pre) => pre.substring(1));

          history("/gameResult");
        } else if (curPage == 4) {
          setIsEndResponse(true);
        } else {
          setCurPage((preValue) => preValue + 1);
        }
      }}
      className="question-selectbox"
    >
      {numbering} {Answer[day][curPage >= 5 ? curPage - 5 : curPage - 1][num]}
    </div>
  );
};
