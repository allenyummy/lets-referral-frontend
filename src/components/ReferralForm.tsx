import { useRef, useState } from "react";

import emailjs from "@emailjs/browser";

import "./ReferralForm.css";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import LocationInput from "./LocationInput";
import LoadingSpinner from "./LoadingSpinner";
import SuccessModal from "./SuccessModal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ResumeUpload from "./ResumeUpload";

const ReferralForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [curLocation, setLocation] = useState("Location");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resume, setResume] = useState<File | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileError, setFileError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 嚴謹檢查
    // if (!resume) {
    //   setFileError("Please upload PDF");
    //   return;
    // }
    if (!formRef.current) return;

    setSubmitting(true);

    try {
      // EmailJS – 利用 FormData 傳送
      const formData = new FormData();
      formData.append("user_name", name);
      formData.append("user_email", email);
      formData.append("user_location", curLocation);
      // formData.append("user_resume", resume, resume.name);

      const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
      const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
      const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
      console.log("SERVICE_ID", SERVICE_ID);
      console.log("TEMPLATE_ID", TEMPLATE_ID);
      console.log("PUBLIC_KEY", PUBLIC_KEY);


      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      // 成功
      setShowSuccess(true);

      // 清空所有欄位
      setName("");
      setEmail("");
      setLocation("Location");
      setResume(null);
      setFileError("");
    } catch (err) {
      console.error("EmailJS error", err);
      alert(
        "The maximum number of referrals for today has been reached. Please try again tmr. 🙂"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tsmc-form-container">
      {isSubmitting && <LoadingSpinner />}
      <form ref={formRef} action="" onSubmit={handleSubmit}>
        <h1> TSMC Referral </h1>
        <NameInput name="user_name" value={name} onChange={setName} />
        <EmailInput name="user_email" value={email} onChange={setEmail} />
        <LocationInput
          name="user_location"
          value={curLocation}
          onChange={setLocation}
        />
        {/* <ResumeUpload
          name="user_resume"
          file={resume}
          error={fileError}
          onFileChange={setResume}
          onError={setFileError}
        /> */}

        <button type="submit">Lucky Submit</button>
        <SuccessModal show={showSuccess} onHide={() => setShowSuccess(false)} />
      </form>
    </div>
  );
};

export default ReferralForm;
