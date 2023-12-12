import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { userIdState } from "../recoil/atoms";

const BASE_URL = "https://otherhalfgame.site/api" + "/reply";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ReqCreateReply {
  userId: number;
  day: number;
  myReply: string;
  predictedReply: string;
}

interface ReqGetReply {
  userId: number;
  day: number;
}

interface ResGetReply {
  userId: number;

  replyId: number;

  day: number;

  myReply: string;

  predictedReply: string;

  text: string;
}

export const getReply = (
  request: ReqGetReply
): Promise<AxiosResponse<number>> => {
  return axiosInstance.post("/detail", request);
};
