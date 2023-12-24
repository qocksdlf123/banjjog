import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { myNameState, banjjogNameState, userIdState } from "../../recoil/atoms";
import { isExistUser, createUser } from "../../api/UserAPI";

const StartPage = () => {
  return (
    <div className="webapp-box">
      <Header />
      <MainContent />
    </div>
  );
};

const Header = () => (
  <div className="start-header">
    <div className="start-title">나와 연인의 이름을 입력해주세요.</div>
  </div>
);

const MainContent = () => {
  const [myName, setMyName] = useRecoilState(myNameState);
  const [banjjogName, setBanjjogName] = useRecoilState(banjjogNameState);
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(userIdState);

  const handleNameChange = useCallback((setter) => (event) => {
    setter(event.target.value);
  }, []);

  const startGame = useCallback(() => {
    if (!myName || !banjjogName) {
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

    localStorage.setItem("myName", myName);
    localStorage.setItem("yourName", banjjogName);

    isExistUser({ myName, banjjogName }).then((response) => {
      const userId = response.data === 0 
        ? createUser({ myName, banjjogName }).then((res) => res.data.userId) 
        : response.data;
      
      setUserId(userId);
      localStorage.setItem("userId", userId.toString());
      navigate("/gameList");
    });
  }, [myName, banjjogName, navigate]);

  return (
    <div className="start-body">
      <NameInput label="나의 이름은?" value={myName} onChange={handleNameChange(setMyName)} />
      <NameInput label="연인의 이름은?" value={banjjogName} onChange={handleNameChange(setBanjjogName)} />
      <div className="start-body-text">
        나와 연인의 이름을 입력해야
        <br />
        서로의 결과를 비교해서 볼 수 있습니다
      </div>
      <button onClick={startGame} className="main-start-btn">시작하기</button>
    </div>
  );
};

const NameInput = ({ label, value, onChange }) => (
  <div className="start-container">
    <div>{label}</div>
    <input
      className="start-inputbox"
      placeholder="[입력] 이름 입력"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default StartPage;