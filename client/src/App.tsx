import { CavasRoute } from "./routes/CavasRoute";
import HomeRoute from "./routes/HomeRoute";
import Navbar from "./components/ui/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <CavasRoute />
      <HomeRoute />
    </>
  );
}

export default App;
