import { hero } from "../assets";
import { CSSTransition } from "react-transition-group";
import { Pages } from "../constants";
import { Hero3d } from "../components";
import { Canvas } from "@react-three/fiber";

const Home = ({ currPage }: { currPage: Pages }) => {
  return (
    <CSSTransition
      in={currPage === Pages.Home}
      appear={currPage === Pages.Home}
      timeout={500}
      classNames="slide"
      unmountOnExit={true}
    >
      <div className="w-full h-full  min-h-[600px] text-center flex shrink-0 justify-center md:justify-between items-center gap-y-12 lg:gap-y-14 flex-col md:flex-row ">
        <div className="text-left space-y-8">
          <h1 className="lg:max-w-[800px] leading-tight">
            Certify and Verify Diplomas with Our Blockchain Tool
          </h1>
          <h4 className="text-s md:text-md lg:text-lg xl:text-xl lg:max-w-[500px]">
            Join us in embracing the future of credential validation with a
            simple, efficient, and tamper-proof system.
          </h4>
        </div>

        <div className="w-full h-full absolute top-1/2 left-1/4 -translate-y-1/2 ">
          <Hero3d />
        </div>
      </div>
    </CSSTransition>
  );
};

export default Home;
/* Embrace Blockchain Today */
