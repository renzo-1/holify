import { CSSTransition } from "react-transition-group";
import { Pages } from "../constants";
import { VerificationResult, VerifyForm } from "../components";
import { useState } from "react";
const Verify = ({ currPage }: { currPage: Pages }) => {
  const [verifiedStudent, setVerifiedStudent] = useState<Student>();
  const [error, setError] = useState<string>();

  return (
    <CSSTransition
      in={currPage === Pages.Verify}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full min-h-[900px]  text-center flex flex-col justify-center items-center gap-y-7 ">
        <h1>Verify a Diploma</h1>
        <VerifyForm
          setVerifiedStudent={setVerifiedStudent}
          setError={setError}
        />
        {verifiedStudent && (
          <VerificationResult verifiedStudent={verifiedStudent} />
        )}
        {error && <h2 className="font-bold text-red-500">Unverified Token!</h2>}
      </div>
    </CSSTransition>
  );
};

export default Verify;
