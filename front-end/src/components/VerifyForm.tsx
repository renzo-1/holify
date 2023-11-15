import React, { Dispatch, SetStateAction } from "react";
import { getContract } from "../web3/utils";
import { ChangeEvent, useState, FormEvent } from "react";
import { useWeb3Context } from "../contexts/Web3";

const VerifyForm = ({
  setVerifiedStudent,
  setError,
}: {
  setVerifiedStudent: Dispatch<SetStateAction<Student | undefined>>;
  setError: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { holifyAccount } = useWeb3Context() as Web3Context;
  const [tokenId, setTokenId] = useState<number | undefined>(undefined);

  const handleVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenId && tokenId != 0) return;
    setIsLoading(true);
    try {
      const contract = await getContract();
      const data = (await contract.methods.verify(tokenId!).call()) as Student;
      setVerifiedStudent(data);
      setError(undefined);
    } catch (e) {
      setVerifiedStudent(undefined);
      setError("Unverified Diploma");
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setTokenId(parseInt(e.target.value));
  };
  return (
    <>
      <form
        className="w-full md:space-x-5 space-y-5 md:space-y-0 flex flex-col md:flex-row justify-center items-center"
        onSubmit={handleVerification}
      >
        <input
          id="tokenId"
          onChange={handleChange}
          value={tokenId}
          autoFocus
          type="number"
          required
          placeholder="Token ID here"
          className="bg-transparent border-b-2 text-sm md:text-base lg:text-lg xl:text-2xl pt-2 w-full max-w-[250px] md:max-w-[300px] "
        ></input>
        <button
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-500" : "bg-green-700"
          } cursor-pointer shadow-md px-2 py-1 md:px-4 md:py-2`}
        >
          Verifiy
        </button>
      </form>
    </>
  );
};

export default VerifyForm;
