import React, { Dispatch, SetStateAction } from "react";
import { getContract } from "../web3/utils";
import { ChangeEvent, useState, FormEvent } from "react";
import { useWeb3Context } from "../contexts/Web3";

const VerifyForm = ({
  setVerifiedStudent,
}: {
  setVerifiedStudent: Dispatch<SetStateAction<Student | undefined>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { holifyAccount } = useWeb3Context() as Web3Context;
  const [tokenId, setTokenId] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tokenId);
    if (!tokenId && tokenId != 0) return;
    setIsLoading(true);
    try {
      const contract = await getContract();
      const data = (await contract.methods.verify(tokenId!).call()) as Student;
      console.log(data);
      setVerifiedStudent(data);
    } catch (e) {
      console.error(e);
      //   alert("You are not authorised to create a Certificate");
    }
    setIsLoading(false);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setTokenId(parseInt(e.target.value));
  };
  return (
    <>
      <form className="w-full space-y-5 md:space-x-5" onSubmit={handleSubmit}>
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
          } cursor-pointer  rounded-lg shadow-md px-4 py-2`}
        >
          Verifiy
        </button>
      </form>
    </>
  );
};

export default VerifyForm;
