import { CSSTransition } from "react-transition-group";
import { Pages } from "../constants";
import { VerificationResult, VerifyForm } from "../components";
import { useState } from "react";
const Verify = ({ currPage }: { currPage: Pages }) => {
  const [verifiedStudent, setVerifiedStudent] = useState<Student>();

  return (
    <CSSTransition
      in={currPage === Pages.Verify}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full h-full text-center flex flex-col justify-center items-center gap-y-7 ">
        <h1>Verify a Diploma</h1>
        <VerifyForm setVerifiedStudent={setVerifiedStudent} />
        {verifiedStudent && (
          <VerificationResult verifiedStudent={verifiedStudent} />
        )}
      </div>
    </CSSTransition>
  );
};

export default Verify;
