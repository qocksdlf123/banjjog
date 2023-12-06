import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShareLinkImage from "../../assets/GameResultPageAssets/ShareLinkImage.png";
import KakaoImage from "../../assets/GameResultPageAssets/KakaoImage.png";

const GameResultPage = () => {
  const isResult: boolean = false;
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
  return (
    <div className="no-result-footer">
      <div className="no-result-footer-iconContainer">
        <img className="no-result-footer-icon" src={ShareLinkImage}></img>
        <div>공유 링크</div>
      </div>
      <div className="no-result-footer-iconContainer">
        <img className="no-result-footer-icon" src={KakaoImage}></img>
        <div>카카오톡 채널추가</div>
      </div>
    </div>
  );
};

const ResultHeader = () => {
  return <div className="result-header"></div>;
};

const ResultBody = () => {
  return <div className="result-body"></div>;
};

const ResultFooter = () => {
  return <div className="result-footer"></div>;
};
