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

interface ResGetOpinions {
  day: number;
  text: string;
}

interface ReqPutText{
  replyId: number;
  text: string;
}
interface ResCreateReply{
  replyId: number;
}

export const getReply = (
  request: ReqGetReply
): Promise<AxiosResponse<ResGetReply>> => {
  return axiosInstance.get(
    "/detail?userId=" + request.userId + "&day=" + request.day
  );
};

export const createReply = (
  request: ReqCreateReply
): Promise<AxiosResponse<ResCreateReply>> => {
  return axiosInstance.post("", request);
};

export const getOpinions = (
  userId: number
): Promise<AxiosResponse<ResGetOpinions[]>> => {
  return axiosInstance.get("text" + "?userId=" + userId);
};

export const addText = (
  request: ReqPutText
): Promise<AxiosResponse<ReqPutText[]>> => {
  return axiosInstance.put("", request);
};
