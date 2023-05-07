import { FC } from "react";
import css from "@styles/utils/loading.module.css";

type settingsType = {
  size?: number;
};

export const Loading: FC<settingsType> = ({ size }) => {
  return (
    <div className={`${css.lds_ellipsis}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
