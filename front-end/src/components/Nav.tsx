import React, { Dispatch, SetStateAction } from "react";
import { Pages } from "../interfaces";

const Nav = ({
  setCurrPage,
}: {
  setCurrPage: Dispatch<SetStateAction<Pages>>;
}) => {
  return (
    <nav className="absolute w-full top-0 left-0 px-4 py-7 z-[9999]">
      <ul className="flex justify-between items-center">
        <li
          className="font-bold cursor-pointer"
          onClick={() => setCurrPage(Pages.Home)}
        >
          Holify
        </li>
        <ul className="flex gap-x-4">
          <li
            className="text-xs cursor-pointer"
            onClick={() => setCurrPage(Pages.Assign)}
          >
            Assign
          </li>
          <li
            className="text-xs cursor-pointer"
            onClick={() => setCurrPage(Pages.Verify)}
          >
            Verify
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default Nav;
