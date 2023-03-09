import { Form } from "react-bootstrap";
import { formatLabel } from "@/utils";

// custom select component
export default function Select(props) {
  const {
    label,
    options,
    value,
    onChange,
    required = false,
    error = { isInvalid: false, feedback: "" },
    type = "text",
  } = props;
  const labelTxt = formatLabel(label);

  const handleValueChange = (event) => {
    if (label == "Dog Duration") {
      if (onChange) {
        onChange(parseInt(event.target.value, 10));
      }
      return;
    }

    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <Form.Group className="mb-3" controlId={label}>
      <Form.Label>{labelTxt}</Form.Label>
      <Form.Select
        isInvalid={error.isInvalid}
        required={required}
        type={type}
        onChange={handleValueChange}
        value={value}
      >
        {<option value="">{`Please Choose ${labelTxt}`}</option>}
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type={error.isInvalid ? "invalid" : "valid"}>
        {error.feedback}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
