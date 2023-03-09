import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Toast, Input } from "@/components";
import { httpRequest, formatLabel } from "@/utils";

function Register() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    password: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    confirmPassword: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    email: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
  });

  const [toastProps, setToastProps] = useState({
    visible: false,
    message: "",
  });

  const { username, password, confirmPassword, email } = form;

  const handleFormChange = (key, value) => {
    const isInvalid = key === !value;
    const feedback = isInvalid
      ? `Please Enter A ${formatLabel(key)}!`
      : "Looks Goods!";
    if (key === "password") {
      setForm({
        ...form,
        [key]: {
          ...form[key],
          value,
          error: {
            isInvalid,
            feedback: !value ? "Please Enter A Password!" : "",
          },
        },
      });
      return;
    }
    if (key === "confirmPassword") {
      setForm({
        ...form,
        [key]: {
          ...form[key],
          value,
          error: {
            isInvalid: !password.value || !value || value !== password.value,
            feedback: !password.value
              ? "Please Enter A Password First!"
              : !value
              ? "Please Enter A ConfirmPassword!"
              : value !== password.value
              ? "Please Enter The Same Password!"
              : "Looks Goods!",
          },
        },
      });
      return;
    }
    setForm({
      ...form,
      [key]: {
        ...form[key],
        value,
        error: {
          isInvalid,
          feedback,
        },
      },
    });
  };

  const handleValiaAll = () => {
    setForm({
      ...form,
      username: {
        ...form.username,
        error: {
          isInvalid: !username.value,
          feedback: !username.value
            ? "Please Enter A UserName!"
            : "Looks Goods!",
        },
      },
      password: {
        ...form.password,
        error: {
          isInvalid: !password.value,
          feedback: !password.value ? "Please Enter A Password!" : "",
        },
      },
      confirmPassword: {
        ...form.confirmPassword,
        error: {
          isInvalid:
            !password.value ||
            !confirmPassword.value ||
            confirmPassword.value !== password.value,
          feedback: !password.value
            ? "Please Enter A Password First!"
            : !confirmPassword.value
            ? "Please Enter A ConfirmPassword!"
            : confirmPassword.value !== password.value
            ? "Please Enter The Same Password!"
            : "",
        },
      },
      email: {
        ...form.email,
        error: {
          isInvalid: !email.value,
          feedback: !email.value ? "Please Enter A Email!" : "",
        },
      },
    });
  };

  const onRegister = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    handleValiaAll();
    if (form.checkValidity() === true) {
      const res = await httpRequest(
        "/register/",
        "POST",
        {
          password: password.value,
          email: email.value,
          username: username.value,
        },
        false
      );
      // show error message
      if (!res.user) {
        setToastProps({
          ...toastProps,
          visible: true,
          message: "got an error!",
        });
      } else {
        alert('Register success!')
        navigate("/login");
      }
    }
  };

  return (
    <Container className="pt-3">
      <Toast
        {...toastProps}
        setVisible={() =>
          setToastProps({ ...toastProps, visible: !toastProps.visible })
        }
      />
      <img
        src="/logo.png"
        alt="logo"
        style={{ width: 120, marginBottom: 30 }}
      />
      <Row>
        <Col>
          <h2>Register</h2>
          <Form noValidate validated={validated} onSubmit={onRegister}>
            <Input
              label="username"
              error={username.error}
              value={username.value}
              required
              onChange={(value) => handleFormChange("username", value)}
            />
            <Input
              label="password"
              error={password.error}
              value={password.value}
              required
              type="password"
              onChange={(value) => handleFormChange("password", value)}
            />
            <Input
              label="confirmPassword"
              error={confirmPassword.error}
              value={confirmPassword.value}
              required
              type="password"
              onChange={(value) => handleFormChange("confirmPassword", value)}
            />
            <Input
              label="email"
              error={email.error}
              value={email.value}
              required
              onChange={(value) => handleFormChange("email", value)}
            />
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Button
              variant="link"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
