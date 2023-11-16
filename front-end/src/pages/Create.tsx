import { CSSTransition } from "react-transition-group";
import { Tutorial, CreateForm, PDF } from "../components";
import { Pages } from "../constants";
import { useState } from "react";
const Create = ({ currPage }: { currPage: Pages }) => {
  const [isTutorial, setIsTutorial] = useState<boolean>(false);
  const [graduates, setGraduates] = useState<Certificate[]>();

  return (
    <CSSTransition
      in={currPage === Pages.Create}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="px-4 w-full h-full  min-h-[600px]  text-center flex flex-col justify-center items-center gap-y-7 md:gap-y-8">
        <h1>Create diplomas</h1>

        {graduates ? (
          <PDF graduates={graduates} setGraduates={setGraduates} />
        ) : (
          <>
            <CreateForm setGraduates={setGraduates} />
            <button className="underline" onClick={() => setIsTutorial(true)}>
              <h4 className="xl:text-lg">Click here for more info</h4>
            </button>
            {isTutorial && <Tutorial setIsTutorial={setIsTutorial} />}
          </>
        )}
      </div>
    </CSSTransition>
  );
};

export default Create;
