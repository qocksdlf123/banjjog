import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { userIdState } from "../recoil/atoms";

const BASE_URL = "https://otherhalfgame.site/api" + "/user";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserCount = (): Promise<AxiosResponse<number>> => {
  return axiosInstance.get("/count");
};

interface UserInfo {
  myName: string;
  yourName: string;
}

interface UserResponseInfo {
  userId: number;
  myName: string;
  yourName: string;
}
export const isExistUser = (
  request: UserInfo
): Promise<AxiosResponse<number>> => {
  return axiosInstance.post("/exist", request);
};

export const createtUser = (
  request: UserInfo
): Promise<AxiosResponse<UserResponseInfo>> => {
  return axiosInstance.post("", request);
};
