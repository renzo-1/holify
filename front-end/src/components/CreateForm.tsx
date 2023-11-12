import {
  useRef,
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { utils, read } from "xlsx";
import { useWeb3Context } from "../contexts/Web3";
import { getContract } from "../web3/utils";

const excelDateToDDMonthYY = (serialDate: number): string => {
  const baseDate = new Date(1899, 11, 30); // Excel's base date (month is zero-based in JavaScript)

  // Convert serial date to milliseconds and add to the base date
  const dateValue = new Date(
    baseDate.getTime() + serialDate * 24 * 60 * 60 * 1000
  );

  // Format the date as "DD Month, YYYY"
  const options = { year: "numeric", month: "long", day: "2-digit" } as const;
  const formattedDate = dateValue.toLocaleDateString("en-US", options);

  return formattedDate;
};
const CreateForm = ({
  setGraduates,
}: {
  setGraduates: Dispatch<SetStateAction<Certificate[] | undefined>>;
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [students, setStudents] = useState<Student[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [school, setSchool] = useState<School>();
  const { holifyAccount } = useWeb3Context() as Web3Context;
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const newTokenListener = async () => {
    const contract = await getContract();

    return new Promise((resolve) => {
      let id: string;

      contract.events
        .MintedCert({
          fromBlock: "latest",
        })
        .on("data", function (event) {
          id = (event.returnValues._tokenId as bigint).toString();
          resolve(id);
        });
    });
  };
  const handleMint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (students) {
      try {
        const contract = await getContract();
        const graduates: Certificate[] = [];
        for (let student of students) {
          const studentData = {
            studentName: student.studentName.toString(),
            studentNum: student.studentNum.toString(),
            program: student.program.toString(),
            specialization: student.specialization || "",
            gradDate: excelDateToDDMonthYY(
              parseInt(student.gradDate)
            ).toString(),
          };

          await contract.methods
            .mint(
              studentData.studentName,
              studentData.studentNum,
              studentData.program,
              studentData.specialization,
              studentData.gradDate
            )
            .send({ from: holifyAccount, gas: "1000000" });
          const newToken = (await newTokenListener()) as string;

          graduates.push({
            ...studentData,
            tokenId: newToken,
            dean: school?.dean!,
            president: school?.president!,
            school: school?.school!,
          });
        }
        setGraduates(graduates!);
        handleRemoveFile();
      } catch (e) {
        console.error(e);
        //   alert("You are not authorised to create a Certificate");
      }
    }
    setIsLoading(false);
  };

  const handleFileButton = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current?.click();
  };

  const readUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log(e.target.files);
    if (e.target.files) {
      const reader = new FileReader();
      setUploadedFile(e.target.files[0]);

      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rowData: Row[] = utils.sheet_to_json(worksheet);
        console.log("rowData", rowData);
        let schoolInfo: School;
        const gradsArr: Student[] = rowData.map((row: Row) => {
          //   console.log(row);
          if (row.president && row.dean && row.school) {
            schoolInfo = {
              president: row.president,
              dean: row.dean,
              school: row.school,
            };
            // console.log("school info", schoolInfo);
            setSchool(schoolInfo);
          }

          return {
            studentName: row.studentName,
            studentNum: row.studentNum,
            program: row.program,
            specialization: row?.specialization,
            gradDate: row.gradDate,
          };
        });
        setStudents(gradsArr);
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(undefined);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-y-4 ">
        <button onClick={handleFileButton}>
          <svg
            className="w-20 md:w-24 lg:w-32 bi bi-filetype-xlsx "
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"
            />
          </svg>
        </button>

        {uploadedFile && (
          <div className="flex justify-between items-center shadow-md px-4 py-2 rounded-lg gap-x-4">
            <p className="text-sm inline-block text-ellipsis truncate overflow-hidden ">
              {uploadedFile.name}
            </p>
            <button
              className="inline-block font-bold transition-all duration-500 ease-out"
              onClick={handleRemoveFile}
            >
              x
            </button>
          </div>
        )}

        <h4 className="w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]">
          Upload your file and we will handle the token assignment
        </h4>
      </div>
      <form ref={formRef} onSubmit={handleMint}>
        <input
          required
          type="file"
          accept=".xlsx "
          // multiple
          ref={inputFileRef}
          onChange={readUploadFile}
          className="hidden"
        />
        {students?.length! > 0 && (
          <button
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-500" : "bg-green-700"
            } cursor-pointer  rounded-lg shadow-md px-4 py-2`}
          >
            Generate diplomas
          </button>
        )}
      </form>
    </>
  );
};

export default CreateForm;
