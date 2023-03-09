import { Form } from "react-bootstrap";
import { formatLabel } from "@/utils";

// custom input component
export default function Input(props) {
  const {
    label,
    value,
    onChange,
    disabled = false,
    required = false,
    error = { isInvalid: false, feedback: "" },
    type = "text",
  } = props;
  const labelTxt = formatLabel(label);

  const handleValueChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <Form.Group className="mb-3" controlId={label}>
      <Form.Label>{labelTxt}</Form.Label>
      <Form.Control
        isInvalid={error.isInvalid}
        required={required}
        type={type}
        placeholder={`Please Enter ${labelTxt}`}
        onChange={handleValueChange}
        value={value}
        disabled={disabled}
      />
      <Form.Control.Feedback type={error.isInvalid ? "invalid" : "valid"}>
        {error.feedback}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
