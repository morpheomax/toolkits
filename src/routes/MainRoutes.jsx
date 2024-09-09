import { Route, Routes } from "react-router-dom";


// Improtar publicos
import { HomePage } from "../pages/HomePage";

const MainRoutes = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>
    );
  };
  
  export default MainRoutes;