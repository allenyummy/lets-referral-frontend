import { useRef, useState } from "react";

import "./ReferralForm.css";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import LocationInput from "./LocationInput";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ResumeUpload from "./ResumeUpload";
import LoadingSpinner from "./LoadingSpinner";
import SuccessModal from "./SuccessModal";
import emailjs from "@emailjs/browser";

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

      const SERVICE_ID = "service_q4ipnve";
      const TEMPLATE_ID = "template_ui0evzy";
      const PUBLIC_KEY = "qsCAPdjyQ5huPTg-7";

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
      alert("寄送失敗，請稍後再試或聯絡管理員。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tsmc-form-container">
      {isSubmitting && <LoadingSpinner />}
      <form ref={formRef} action="" onSubmit={handleSubmit}>
        <h1> Referral </h1>
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
