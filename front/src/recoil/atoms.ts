// atoms.ts
import { atom } from "recoil";

export const countPage = atom({
  key: "countCurPage",
  default: 1,
});
export const countTotalPage = atom({
  key: "countTotalPage",
  default: 4,
});
