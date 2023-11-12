import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import modifyPdf from "./PDFModifier";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDF = ({
  graduates,
  setGraduates,
}: {
  graduates: Certificate[];
  setGraduates: Dispatch<SetStateAction<Certificate[] | undefined>>;
}) => {
  const [pdfUrl, setPDFUrl] = useState<string>();

  useEffect(() => {
    async function load() {
      console.log("asd");
      const res = await modifyPdf(graduates);
      setPDFUrl(res);
    }
    load();
  }, []);

  return (
    <>
      {pdfUrl && (
        <div className="min-w-fit min-h-fit px-10 py-5 space-y-4">
          <div className="flex justify-center items-center gap-x-4">
            <a
              download="HolifyDiplomas.pdf"
              href={pdfUrl}
              className="bg-green-700  cursor-pointer  rounded-lg shadow-md px-4 py-2  drop-shadow-lg inline-block"
            >
              Download diplomas
            </a>
            <button
              className="flex justify-end"
              onClick={() => setGraduates(undefined)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className="fill-white w-4 ml-full"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>

          <h4 className="w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]">
            Diplomas are ready! Click the button to download them.
          </h4>
        </div>
      )}
    </>
  );
};

export default PDF;
