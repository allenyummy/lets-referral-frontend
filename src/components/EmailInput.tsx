import { MdEmail } from "react-icons/md";

interface Props {
  name: string,
  value: string;
  onChange: (val: string) => void;
}

const EmailInput = ({ name, value, onChange }: Props) => (
  <div className="box">
    <input
      type="text"
      name={name}
      placeholder="Email"
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <MdEmail className="icon" />
  </div>
);

export default EmailInput;
