import { atom } from "recoil";

export interface AppInit {
  isInitializing: boolean;
  isAuthenticated?: boolean;
}
export const AppInitState = atom<AppInit>({
  key: "#global/appInit",
  default: { isInitializing: true, isAuthenticated: false },
});
