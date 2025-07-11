import { useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

import "./ReferralForm.css";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import LocationInput from "./LocationInput";
import LoadingSpinner from "./LoadingSpinner";
import SuccessModal from "./SuccessModal";
import ResumeUpload from "./ResumeUpload";
import Footer from "./Footer";

const ReferralForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Location");
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resume) {
      setFileError("Please upload PDF");
      return;
    }

    if (!formRef.current) return;

    const uuid = `${crypto.randomUUID()}`;
    setSubmitting(true);

    try {
      // Step 1: upload to supabase
      const fileName = `${uuid}-${resume.name}`;
      const { error } = await supabase.storage
        .from("resumes")
        .upload(fileName, resume);

      if (error) {
        setResume(null);
        alert(
          "An error occurred while uploading your resume. \nPlease contact support to Author."
        );
        return;
      }

      // Step 2: send email using EmailJS
      const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
      const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
      const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: name,
          user_email: email,
          user_location: location,
          user_request_uuid: uuid,
        },
        PUBLIC_KEY
      );

      setShowSuccess(true);
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
        <h1> Let's Referral </h1>
        <NameInput name="user_name" value={name} onChange={setName} />
        <EmailInput name="user_email" value={email} onChange={setEmail} />
        <LocationInput
          name="user_location"
          value={location}
          onChange={setLocation}
        />
        <ResumeUpload
          name="user_resume"
          file={resume}
          error={fileError}
          onFileChange={setResume}
          onError={setFileError}
        />
        <button type="submit">Lucky Submit</button>
        <SuccessModal show={showSuccess} onHide={() => setShowSuccess(false)} />
        <Footer />
      </form>
    </div>
  );
};

export default ReferralForm;
