import { useState } from "react";
import { Home, Create, Verify } from "./pages";
import { Nav } from "./components";
import Web3Provider from "./contexts/Web3";
import { Pages } from "./constants";

function App() {
  const [currPage, setCurrPage] = useState<Pages>(Pages.Home);

  return (
    <Web3Provider>
      <div className="px-4 py-7 w-full h-full overflow-hidden relative">
        <Nav setCurrPage={setCurrPage} />
        <Home currPage={currPage} />
        <Create currPage={currPage} />
        <Verify currPage={currPage} />
      </div>
    </Web3Provider>
  );
}

export default App;
