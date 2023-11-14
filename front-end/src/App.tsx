import { useState } from "react";
import { Home, Create, Verify } from "./pages";
import { Nav } from "./components";
import Web3Provider from "./contexts/Web3";
import { Pages } from "./constants";

function App() {
  const [currPage, setCurrPage] = useState<Pages>(Pages.Home);

  return (
    <Web3Provider>
      <div className="w-full h-full max-w-[80%] mx-auto overflow-hidden relative">
        <Nav setCurrPage={setCurrPage} />
        <Home currPage={currPage} />
        <Create currPage={currPage} />
        <Verify currPage={currPage} />
      </div>
    </Web3Provider>
  );
}

export default App;
