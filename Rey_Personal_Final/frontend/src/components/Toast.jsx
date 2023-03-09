import { Toast } from "react-bootstrap";

// show the program message on page
export default function CustomToast(props) {
  const {
    visible,
    setVisible,
    message,
    bg = "danger",
    title = "Error",
  } = props;

  return (
    <Toast
      show={visible}
      onClose={setVisible}
      bg={bg}
      style={{ position: "fixed", top: 20, right: 20 }}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
