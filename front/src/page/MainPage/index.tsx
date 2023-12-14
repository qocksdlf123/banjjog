import "./style.css";
import Logo from "../../assets/MainPageAssets/Logo.png";
import { useNavigate } from "react-router-dom";
import { getUserCount } from "../../api/UserAPI";
import { useEffect, useState } from "react";

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
      <div className="main-title bold">반쪽 퀴즈</div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="main-body">
      <div className="main-body-text">
        반쪽은 연인과 함께 즐길 수 있는
        <br />
        ‘퀴즈형 게임’ 콘텐츠를 제공하고 있습니다.
      </div>
      <img className="main-body-logo" src={Logo}></img>
    </div>
  );
};

const Footer = () => {
  const history = useNavigate();
  const startGame = () => {
    history("/start");
  };
  const [userCount, setUserCount] = useState<number>();

  useEffect(() => {
    getUserCount()
      .then((response) => {
        setUserCount(response.data);
      })
      .catch((error) => {
        console.log("getUserCount error : " + error.toString());
      });
  }, []);
  return (
    <div className="main-footer">
      <button onClick={startGame} className="main-start-btn">
        시작하기
      </button>
      <br></br>
      <div>지금까지 {userCount}명이 참여했어요!</div>
    </div>
  );
};
