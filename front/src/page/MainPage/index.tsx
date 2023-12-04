import "./style.css";
import Logo from "../../assets/MainPageAssets/Logo.png";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="webapp-box">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-title">[텍스트, 제목] 반쪽 퀴즈</div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="main-body">
      <div className="main-body-text">
        [텍스트,본문] 반쪽은 연인과 함께 즐길 수 있는 ‘퀴즈형 게임’ 콘텐츠를
        제공하고 있습니다.
      </div>
      <img
        className="main-body-logo"
        width="100px"
        height="100px"
        src={Logo}
      ></img>
    </div>
  );
};

const Footer = () => {
  const history = useNavigate();
  const startGame = () => {
    history("/start");
  };
  return (
    <div className="main-footer">
      <button onClick={startGame} className="main-start-btn">
        시작하기
      </button>
      <div>지금까지 00명의 유저가 참여했어요</div>
    </div>
  );
};
