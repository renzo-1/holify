import { CSSTransition } from "react-transition-group";
import { Pages } from "../constants";

const Verify = ({ currPage }: { currPage: Pages }) => {
  return (
    <CSSTransition
      in={currPage === Pages.Verify}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full h-full text-center flex flex-col justify-center items-center gap-y-7 ">
        <h1>Enter a token ID</h1>
        <form className="w-full">
          <input
            placeholder="Token ID here"
            className="bg-transparent border-b-2 text-sm md:text-base lg:text-lg xl:text-2xl pt-2 w-full max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px]"
          ></input>
        </form>
      </div>
    </CSSTransition>
  );
};

export default Verify;
