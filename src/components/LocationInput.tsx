import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

interface Props {
  name: string;
  value: string;
  onChange: (val: string) => void;
}

const LocationInput = ({ name, value, onChange }: Props) => (
  <div className="box">
    <input type="hidden" name={name} value={value} />
    
    <DropdownButton
      id="dropdown-basic-button"
      title={value}
      onSelect={(eventKey) => onChange(eventKey || "")}
    >
      <Dropdown.Item eventKey="Taipei">Taipei</Dropdown.Item>
      <Dropdown.Item eventKey="Hsinchu">Hsinchu</Dropdown.Item>
      <Dropdown.Item eventKey="Taichung">Taichung</Dropdown.Item>
      <Dropdown.Item eventKey="Tainan">Tainan</Dropdown.Item>
      <Dropdown.Item eventKey="Kaohsiung">Kaohsiung</Dropdown.Item>
    </DropdownButton>
  </div>
);

export default LocationInput;
