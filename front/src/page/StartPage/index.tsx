import "./style.css";
import Logo from "../../assets/MainPageAssets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { myNameState, banjjogNameState, userIdState } from "../../recoil/atoms";
import { isExistUser, createtUser } from "../../api/UserAPI";
import Swal from "sweetalert2";

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
    <div className="start-header">
      <div className="start-title">나와 연인의 이름을 입력해주세요.</div>
    </div>
  );
};

const Body = () => {
  const [myName, setMyname] = useRecoilState<string>(myNameState);
  const [banjjogName, setbanjjogname] =
    useRecoilState<string>(banjjogNameState);
  const handleInputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyname(event.target.value);
  };
  const handleInputBanjjogName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setbanjjogname(event.target.value);
  };
  return (
    <div className="start-body">
      <div className="start-container">
        <div>나의 이름은?</div>
        <input
          className="start-inputbox"
          placeholder="[입력] 사용자 성명 입력"
          // value={userName}
          onChange={handleInputUserName}
        ></input>
      </div>
      <div className="start-container">
        <div>연인의 이름은?</div>
        <input
          className="start-inputbox"
          placeholder="[입력] 연인 성명 입력"
          // value={banjjogName}
          onChange={handleInputBanjjogName}
        ></input>
      </div>
      <div className="start-body-text">
        나와 연인의 이름을 입력해야
        <br />
        서로의 결과를 비교해서 볼 수 있습니다
      </div>
    </div>
  );
};

const Footer = () => {
  const history = useNavigate();
  const [myName, setMyname] = useRecoilState<string>(myNameState);
  const [yourName, setbanjjogname] = useRecoilState<string>(banjjogNameState);
  const [userId, setUserId] = useRecoilState<number>(userIdState);

  const startGame = () => {
    if (myName == "" || yourName == "") {
      Swal.fire({
        title: "이름을 입력하세요!",
        text: "나와 상대방의 이름은 공백으로 할 수 없습니다.",
        icon: "error",
        confirmButtonColor: "#4461F2",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-login",
          icon: "swal-icon-login",
        },
      });
      return;
    }
    isExistUser({ myName, yourName }).then((response) => {
      if (response.data == 0) {
        createtUser({ myName, yourName }).then((response) => {
          setUserId(response.data.userId);
        });
      } else {
        setUserId(response.data);
      }
    });
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
