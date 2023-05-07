// import { Profile } from "@components/perfil";
import type { FC } from "react";
import { LeftBar } from "./navbar/leftBar";
import { useAuthorization } from "@hooks/index";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "@components/utils/loading";
import css from "@styles/chat/chat.module.css";

export const Chat: FC = () => {
  const { check } = useAuthorization();
  return (
    <>
      {check === false ? (
        <Navigate to={"/login"} />
      ) : check === undefined ? (
        <div className={`${css.center_loading}`}>
          <Loading />
        </div>
      ) : (
        <main className={`${css.main}`}>
          <LeftBar />
          <Outlet />
        </main>
      )}
    </>
  );
};
