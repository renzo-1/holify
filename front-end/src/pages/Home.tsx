import { hero } from "../assets";
import { CSSTransition } from "react-transition-group";
import { Pages } from "../interfaces";

const Home = ({ currPage }: { currPage: Pages }) => {
  return (
    <CSSTransition
      in={currPage === Pages.Home}
      appear={currPage === Pages.Home}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full h-full text-center flex flex-col justify-center items-center gap-y-12 ">
        <div>
          <h1 className="gradient-text font-extrabold text-4xl">
            Embrace Blockchain Today
          </h1>
          <p className="text-xs">Seal your sucess with Holify</p>
        </div>
        <img src={hero} alt="hero" className="w-full max-w-[200px]"></img>
      </div>
    </CSSTransition>
  );
};

export default Home;
/* Embrace Blockchain Today */
