import { CSSTransition } from "react-transition-group";
import { Pages } from "../interfaces";

const Verify = ({ currPage }: { currPage: Pages }) => {
  return (
    <CSSTransition
      in={currPage === Pages.Verify}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full h-full text-center flex flex-col justify-center items-center gap-y-7 ">
        <h1 className="gradient-text font-extrabold text-4xl">
          Enter a token ID
        </h1>
        <form className="w-full">
          <input
            placeholder="Token ID here"
            className="bg-transparent border-b-2 text-sm pty-2 w-full max-w-[250px]"
          ></input>
        </form>
      </div>
    </CSSTransition>
  );
};

export default Verify;
