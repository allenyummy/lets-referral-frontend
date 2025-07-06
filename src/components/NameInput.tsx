import { FaUser } from "react-icons/fa";

interface Props {
  name: string;
  value: string;
  onChange: (val: string) => void;
}

const NameInput = ({ name, value, onChange }: Props) => (
  <div className="box">
    <input
      type="text"
      name={name}
      placeholder="Chinese Name"
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <FaUser className="icon" />
  </div>
);

export default NameInput;
