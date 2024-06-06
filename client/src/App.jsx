import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-full">
      <Navbar />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};
export default App;
