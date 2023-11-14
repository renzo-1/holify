import React, { Dispatch, SetStateAction } from "react";
import { excelSample } from "../assets";

const Tutorial = ({
  setIsTutorial,
}: {
  setIsTutorial: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-10 w-full h-screen border-red-500 flex justify-center items-center flex-col">
      <div className="bg-primary rounded-lg z-20 py-8 px-12 text-left drop-shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-left text-xs md:text-base">
            Format for creating the spreadsheet
          </h2>
          <button onClick={() => setIsTutorial(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="fill-white w-4"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>

        <img
          src={excelSample}
          className="w-full mb-4 max-w-[400px] md:max-w-[800px] lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[1300px] drop-shadow-md"
          alt="excel sample"
        />
        <a
          download="graduatees.xlsx"
          href="/graduates.xlsx"
          className="underline text-xs md:text-base"
        >
          Download sample
        </a>
        <ol className="list-decimal text-left pl-4 mt-8">
          <li className="text-xs md:text-base">
            When creating certificate, ensure that the connected account is from
            Holify account.
          </li>
          <li className="text-xs md:text-base">
            Please ensure that you follow the predefined headers; they are
            constants:
          </li>
          <ul className="list-disc pl-6">
            <li className="text-xs md:text-base">president</li>
            <li className="text-xs md:text-base">dean</li>
            <li className="text-xs md:text-base">school</li>
            <li className="text-xs md:text-base">gradDate</li>
            <li className="text-xs md:text-base">studentName</li>
            <li className="text-xs md:text-base">studentNum</li>
            <li className="text-xs md:text-base">program</li>
            <li className="text-xs md:text-base">specialization</li>
          </ul>
          <li className="text-xs md:text-base">
            Enter data for only one president, dean, school, and graduation
            date.
          </li>
          <li className="text-xs md:text-base">Specialization is optional.</li>
        </ol>
      </div>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 border-red-500 "></div> */}
    </div>
  );
};

export default Tutorial;
