import React, {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
} from "react";
const web3Context = createContext<Web3Context | undefined>(undefined);

export const useWeb3Context = () => {
  return useContext(web3Context);
};

interface AppProps {
  children?: ReactNode;
}

const Web3Provider: FC<AppProps> = ({ children }) => {
  const [holifyAccount, setHolifyAccount] = useState<string>();

  return (
    <web3Context.Provider value={{ holifyAccount, setHolifyAccount }}>
      {children}
    </web3Context.Provider>
  );
};

export default Web3Provider;
