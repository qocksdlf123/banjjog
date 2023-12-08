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
export const endResponse: RecoilState<boolean> = atom({
  key: "endResponse",
  default: false,
});
