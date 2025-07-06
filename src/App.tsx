import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReferralPage from "./pages/ReferralPage";

function App() {
  return (
    <BrowserRouter basename="/tsmc-referral-frontend">
      <Routes>
        {["/"].map((path, index) => (
          <Route key={index} path={path} element={<ReferralPage />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
