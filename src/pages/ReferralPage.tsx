import { useNavigate } from "react-router-dom";

import ReferralForm from "../components/ReferralForm";
import "./ReferralPage.css";

const RerferralPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  return (
    <div className="tsmc-page-container">
      <ReferralForm />
    </div>
  );
};

export default RerferralPage;
