import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";
import { Pages } from "../constants";
import { connect2Metamask, getHolifyAccAdd } from "../web3/utils";
import { useWeb3Context } from "../contexts/Web3";

const Nav = ({
  currPage,
  setCurrPage,
}: {
  currPage: Pages;
  setCurrPage: Dispatch<SetStateAction<Pages>>;
}) => {
  const { holifyAccount, setHolifyAccount } = useWeb3Context() as Web3Context;
  const [isShowAcc, setIsShowAcc] = useState<Boolean>(false);
  useLayoutEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    function handleAccountsChanged(accounts: string[]) {
      setHolifyAccount(accounts[0]);
    }

    // initialize account on reload, if the account is already connected with metamask
    const checkAccount = async () => {
      if (await window.ethereum._metamask.isUnlocked()) {
        connect2Metamask().then((address) => setHolifyAccount(address));
      }
    };
    checkAccount();
  }, []);

  return (
    <nav className="absolute w-full top-0 left-0 py-7 lg:py-12 z-[9999]">
      {/* <nav className="mt-10 z-[99999] block"> */}
      <ul className="flex flex-col md:flex-row justify-between items-center">
        <ul className="flex justify-center items-center mb-10 md:mb-0  gap-x-7 md:gap-x-10">
          <li
            className={`${
              currPage === Pages.Home && "border-b-2"
            } font-bold cursor-pointer text-sm md:text-sm lg:text-base xl:text-2xl selectedNav relative`}
            onClick={() => setCurrPage(Pages.Home)}
          >
            Holify
          </li>
          <li
            className={`${
              currPage === Pages.Create && "border-b-2"
            } text-sm cursor-pointer md:text-sm xl:text-xl selectedNav relative `}
            onClick={() => setCurrPage(Pages.Create)}
          >
            Create
          </li>
          <li
            className={`${
              currPage === Pages.Verify && "border-b-2"
            } text-sm cursor-pointer md:text-sm xl:text-xl selectedNav relative `}
            onClick={() => setCurrPage(Pages.Verify)}
          >
            Verify
          </li>
        </ul>
        {!holifyAccount ? (
          <li
            className="text-center text-sm cursor-pointer md:text-sm xl:text-xl border px-2 py-1  md:px-3 md:py-2 lg:px-4"
            onClick={() =>
              connect2Metamask().then((address) => setHolifyAccount(address))
            }
          >
            Metamask
          </li>
        ) : (
          <li className="">
            <button onClick={() => setIsShowAcc((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-person-circle w-5 lg:w-7"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </button>
            {isShowAcc && (
              <div className="absolute top-100 left-100 -translate-x-1/2 md:-translate-x-full w-fit z-100 bg-primary shadow-lg py-2 px-4">
                <h2 className="md:text-left md:max-w-full md:whitespace-nowrap break-words max-w-[200px] text-base lg:text-lg xl:text-xl">
                  <b>Account:</b> {holifyAccount}
                </h2>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
