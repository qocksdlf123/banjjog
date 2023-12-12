// atoms.ts
import { RecoilState, atom } from "recoil";

export const countPage = atom({
  key: "countCurPage",
  default: 1,
});
export const countTotalPage = atom({
  key: "countTotalPage",
  default: 4,
});

export const selectedDayState = atom({
  key: "selectedDayState",
  default: 1,
});

export const endResponse: RecoilState<boolean> = atom({
  key: "endResponse",
  default: false,
});

export const userIdState = atom({
  key: "userIdState",
  default: 0,
});

export const myNameState = atom({
  key: "myNameState",
  default: "",
});

export const banjjogNameState = atom({
  key: "banjjogNameState",
  default: "",
});

export const myAnswerState = atom({
  key: "myAnswerState",
  default: "",
});

export const yourAnswerState = atom({
  key: "yourAnswerState",
  default: "",
});
