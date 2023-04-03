import { FC, ReactNode, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { AppInitState } from "./stores";

const PrivateRoute: FC<{ component: ReactNode }> = ({ component }) => {
  const appInit = useRecoilValue(AppInitState);
  const urlSignin = useUrlSignin();

  return (
    <>
      {!appInit.isInitializing ? (
        appInit.isAuthenticated ? (
          component
        ) : (
          <Navigate to={urlSignin} replace />
        )
      ) : (
        "We are checking the certification..."
      )}
    </>
  );
};

export default PrivateRoute;

export const useUrlSignin = () => {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const { href, origin } = document.location;
    const searchParams = new URLSearchParams();
    searchParams.append("next", href.substring(origin.length));

    setResult("/login?".concat(searchParams.toString()));
  }, []);

  return result;
};
