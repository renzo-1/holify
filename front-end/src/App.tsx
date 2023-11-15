import { useState } from "react";
import { Home, Create, Verify } from "./pages";
import { Nav } from "./components";
import Web3Provider from "./contexts/Web3";
import { Pages } from "./constants";
import { Hero3d } from "./components";
function App() {
  const [currPage, setCurrPage] = useState<Pages>(Pages.Home);

  return (
    <Web3Provider>
      <div className="w-full h-full max-w-[80%] mx-auto relative">
        <Nav currPage={currPage} setCurrPage={setCurrPage} />
        <Home currPage={currPage} />
        <Create currPage={currPage} />
        <Verify currPage={currPage} />
      </div>
    </Web3Provider>
  );
}

export default App;
