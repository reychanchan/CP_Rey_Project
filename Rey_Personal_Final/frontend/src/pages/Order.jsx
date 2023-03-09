import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import { httpRequest } from "@/utils";
import { Toast, Input, Select, Navbar } from "@/components";

function Order() {
  const [toastProps, setToastProps] = useState({
    visible: false,
    message: "",
  });
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getOrderList();
  }, []);

  // get user histoty order
  const getOrderList = async () => {
    const res = await httpRequest("/orders/");
    if (res.code) {
      setToastProps({
        ...toastProps,
        visible: true,
        message: res.detail,
      });
    } else {
      console.log(res);
      setOrderList(res);
    }
  };

  const DeleteOrder = (id) => {
    httpRequest(`/orders/${id}/`, "DELETE", {}).then((res) => {
      alert("Delete success!");
      getOrderList();
    });
  };

  return (
    <Container className="pt-3">
      <Toast
        {...toastProps}
        setVisible={() =>
          setToastProps({ ...toastProps, visible: !toastProps.visible })
        }
      />
      <Navbar />
      <h2 className="mb-3">History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Dog Breed</th>
            <th>Dog Age</th>
            <th>Dog Size</th>
            <th>Walk Start</th>
            <th>Walk Duration</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.dog_breed}</td>
              <td>{item.dog_age}</td>
              <td>{item.dog_size}</td>
              <td>{item.rent_start}</td>
              <td>{item.rent_duration}min</td>
              <td>{item.location}</td>
              <td>
                <Button variant="danger" onClick={()=>{DeleteOrder(item.id)}}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Order;
