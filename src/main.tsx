import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./Router";
// import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { AppInitState } from "./stores";

const Wrapper = () => {
  const setAppInit = useSetRecoilState(AppInitState);

  useEffect(() => {
    (async () => {
      setAppInit({
        isAuthenticated: await new Promise((r) =>
          setTimeout(() => r(true), 1000)
        ),
        isInitializing: false,
      });
    })();
  }, []);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Wrapper />
    </RecoilRoot>
  </React.StrictMode>
);
