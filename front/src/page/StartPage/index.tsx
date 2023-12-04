import "./style.css";
import Logo from "../../assets/MainPageAssets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StartPage = () => {
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default StartPage;

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-title">[텍스트, 제목] 반쪽 퀴즈</div>
    </div>
  );
};

const Body = () => {
  const [userName, setUserName] = useState<string>("");
  const [banjjogName, setBanjjogName] = useState<string>("");
  const handleInputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleInputBanjjogName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBanjjogName(event.target.value);
  };
  return (
    <div className="start-body">
      <div className="start-container">
        <div>나의 이름은?</div>
        <input
          className="start-inputbox"
          placeholder="[입력] 사용자 성명 입력"
          value={userName}
          onChange={handleInputUserName}
        ></input>
      </div>
      <div className="start-container">
        <div>연인의 이름은?</div>
        <input
          className="start-inputbox"
          placeholder="[입력] 연인 성명 입력"
          value={banjjogName}
          onChange={handleInputBanjjogName}
        ></input>
      </div>
      <div className="start-body-text">
        나와 연인의 이름을 입력해야 서로의 결과를 비교해서 볼 수 있습니다
      </div>
    </div>
  );
};

const Footer = () => {
  const history = useNavigate();
  const startGame = () => {
    history("/gameList");
  };
  return (
    <div className="start-footer">
      <button onClick={startGame} className="main-start-btn">
        시작하기
      </button>
    </div>
  );
};
