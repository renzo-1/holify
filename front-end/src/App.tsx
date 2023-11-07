import { useState } from "react";
import { Home, Assign, Verify } from "./pages";
import { Pages } from "./interfaces";
import { Nav } from "./components";

function App() {
  const [currPage, setCurrPage] = useState<Pages>(Pages.Home);
  return (
    <div className="px-4 py-7 w-full h-full overflow-hidden relative">
      <Nav setCurrPage={setCurrPage} />
      <Home currPage={currPage} />
      <Assign currPage={currPage} />
      <Verify currPage={currPage} />
    </div>
  );
}

export default App;
