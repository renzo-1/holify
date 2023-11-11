import { CSSTransition } from "react-transition-group";
import { Tutorial, FileForm } from "../components";
import { Pages } from "../constants";
import { useState } from "react";
const Create = ({ currPage }: { currPage: Pages }) => {
  const [isTutorial, setIsTutorial] = useState<boolean>(false);

  return (
    <CSSTransition
      in={currPage === Pages.Create}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="absolute left-0 top-0 px-4 w-full h-full text-center flex flex-col justify-center items-center gap-y-7 md:gap-y-8 xl:gap-y-14">
        <h1>Drop your data here</h1>
        <FileForm />
        <button className="underline" onClick={() => setIsTutorial(true)}>
          <h4 className="xl:text-lg">Click here for more info</h4>
        </button>
        {isTutorial && <Tutorial setIsTutorial={setIsTutorial} />}
      </div>
    </CSSTransition>
  );
};

export default Create;