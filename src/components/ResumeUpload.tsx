import { MdFileUpload } from "react-icons/md";

interface Props {
  name: string;
  file: File | null;
  error: string;
  onFileChange: (file: File | null) => void;
  onError: (msg: string) => void;
}

const ResumeUpload = ({ name, file, error, onFileChange, onError }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      onError("Only allowed to upload PDF.");
      onFileChange(null);
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      onError("File size should be less than 3 MB");
      onFileChange(null);
      return;
    }
    onError("");
    onFileChange(file);
  };

  return (
    <>
      <div className="box">
        <input
          type="file"
          name={name}
          accept="application/pdf"
          onChange={handleChange}
          required
          className="file-input"
        />
        <input
          type="text"
          placeholder="Upload Resume"
          value={file?.name ?? ""}
          readOnly
        />
        <MdFileUpload className="icon" />
      </div>
      {error && <p className="error-msg">{error}</p>}
    </>
  );
};

export default ResumeUpload;
