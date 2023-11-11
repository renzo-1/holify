import { hero } from "../assets";
import { CSSTransition } from "react-transition-group";
import { Pages } from "../constants";

const Home = ({ currPage }: { currPage: Pages }) => {
  return (
    <CSSTransition
      in={currPage === Pages.Home}
      appear={currPage === Pages.Home}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full h-full text-center flex flex-col justify-center items-center gap-y-12 lg:gap-y-14 ">
        <div className="">
          <h1 className="">Embrace Blockchain Today</h1>
          <h4 className="text-sn md:text-md lg:text-lg xl:text-2xl">
            Seal your sucess with Holify
          </h4>
        </div>
        <img
          src={hero}
          alt="hero"
          className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[420px]"
        ></img>
      </div>
    </CSSTransition>
  );
};

export default Home;
/* Embrace Blockchain Today */
