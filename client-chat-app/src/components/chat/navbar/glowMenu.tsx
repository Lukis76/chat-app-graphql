import css from "@styles/chat/navbar/glowMenu.module.css";
import { Dispatch, FC, SetStateAction } from "react";

export type OptionsGlowMenu = Array<{
  name: string;
  action: () => void;
}>;

type GlowMenuType = {
  style: string;
  options: OptionsGlowMenu;
  view: Dispatch<SetStateAction<boolean>>;
};

export const GlowMenu: FC<GlowMenuType> = ({ style, options, view }) => {
  return (
    <>
      <div onClick={() => view((prev) => !prev)} className={`${css.background}`} />
      <section className={`${style} ${css.view}`}>
        {options.map((select) => {
          return (
            <button key={select.name} onClick={select.action}>
              {select.name}
            </button>
          );
        })}
      </section>
    </>
  );
};
