import React, { Dispatch, SetStateAction, useLayoutEffect } from "react";
import { Pages } from "../constants";
import { connect2Metamask, getHolifyAccAdd } from "../web3/utils";
import { useWeb3Context } from "../contexts/Web3";

const Nav = ({
  setCurrPage,
}: {
  setCurrPage: Dispatch<SetStateAction<Pages>>;
}) => {
  const { holifyAccount, setHolifyAccount } = useWeb3Context() as Web3Context;

  useLayoutEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    function handleAccountsChanged(accounts: string[]) {
      setHolifyAccount(accounts[0]);
    }

    // initialize account on reload, if the account is already connected with metamask
    const checkAccount = async () => {
      if (await window.ethereum._metamask.isUnlocked()) {
        const add = await getHolifyAccAdd();
        setHolifyAccount(add);
      }
    };
    checkAccount();
  }, []);

  return (
    <nav className="absolute w-full top-0 left-0 px-4 md:px-6 lg:px-8 xl:px-24 py-7 lg:py-12 z-[9999]">
      <ul className="flex flex-col md:flex-row justify-between items-center">
        <ul className="flex gap-x-4 lg:gap-x-6  justify-center items-center">
          <li
            className="font-bold cursor-pointer text-sm md:text-sm lg:text-base xl:text-2xl"
            onClick={() => setCurrPage(Pages.Home)}
          >
            Holify
          </li>
          <li
            className="text-sm cursor-pointer md:text-sm xl:text-xl md:ml-4 lg:ml-6 xl:ml-8 2xl:ml-10"
            onClick={() => setCurrPage(Pages.Create)}
          >
            Create
          </li>
          <li
            className="text-sm cursor-pointer md:text-sm xl:text-xl"
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
          <h2 className="mt-10 md:mt-0 text-center md:text-left max-w-[240px] md:max-w-full text-ellipsis overflow-hidden text-base lg:text-lg xl:text-xl">
            <span className="font-bold">Account:</span> {holifyAccount}
          </h2>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
