import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Toast } from '@/components';
import { httpRequest } from '@/utils';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: ''
  })
  const navigate = useNavigate();

  const onLogin = async () => {
    const data = await httpRequest('/token/', 'POST', { username, password }, false);
    console.log('data==',data);
    if (data.detail) {
      setToastProps({
        ...toastProps,
        visible: true,
        message: data.detail
      })
    } else {
      // add the token to cache 
      localStorage.setItem('token', data.access);
      localStorage.setItem('username', username)
      navigate('/home');
    }
  }

  return (
    <Container className="pt-3" style={{ position: 'relative' }}>
      <Toast {...toastProps} setVisible={() => setToastProps({ ...toastProps, visible: !toastProps.visible })} />
      <img src='/logo.png' alt='logo' style={{ width: 120, marginBottom: 30 }} />
      <Row>
        <Col>
          <h2>Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Email" onChange={(event) => setUsername(event.target.value)} value={username} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} value={password} />
            </Form.Group>
            <Button className="mt-3" variant="primary" type="button" onClick={onLogin}>
              Login
            </Button>
            <Button className="mt-3" variant="link" type="button" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
