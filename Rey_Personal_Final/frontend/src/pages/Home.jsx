import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image, Form, Button, Carousel } from "react-bootstrap";
import { httpRequest, formatLabel } from "@/utils";
import { Toast, Input, Select, Navbar } from "@/components";

function Home() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    dog_breed: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    dog_age: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    dog_size: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    rent_date: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    rent_time: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    rent_duration: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
    location: {
      value: null,
      error: {
        isInvalid: false,
        feedback: undefined,
      },
    },
  });
  const [breeds, setBreeds] = useState([]);
  const [dogImageList, setDogImageList] = useState([]);

  const dogSizeList = [
    { label: "Large", value: "large" },
    { label: "Medium", value: "medium" },
    { label: "Small", value: "small" },
  ];

  const rentDurationList = [
    { label: "30min", value: 30 },
    { label: "60min", value: 60 },
    { label: "90min", value: 90 },
    { label: "120min", value: 120 },
  ];

  useEffect(() => {
    getDogBreeds();
  }, []);

  const [toastProps, setToastProps] = useState({
    visible: false,
    message: "",
  });

  const {
    dog_breed,
    dog_age,
    dog_size,
    rent_date,
    rent_time,
    rent_duration,
    location,
  } = form;


  // get all dog breeds by third-party api
  const getDogBreeds = async () => {
    const b = JSON.parse(localStorage.getItem("breeds") || "[]");
    if (b.length !== 0) {
      setBreeds(b);
      return;
    }
    const res = await fetch("https://dog.ceo/api/breeds/list/all").then((r) =>
      r.json()
    );

    let temp = [];
    Object.keys(res.message).forEach((item) => {
      temp.push({ label: item, value: item });
    });
    setBreeds(temp);
    // cache
    localStorage.setItem("breeds", JSON.stringify(temp));
  };

  // handle all input value change
  const handleFormChange = async (key, value) => {
    console.log(key, value);
    const isInvalid = key === !value;
    const feedback = isInvalid
      ? `Please Enter A ${formatLabel(key)}!`
      : "Looks Goods!";

    if (key === "autoDetect") {
      // get user current location
      if (value) {
        const r = await fetch("http://ipinfo.io/?token=ac2d32896eaa36").then(
          (d) => d.json()
        );
        setForm({
          ...form,
          location: {
            value: `${r.city},${r.region},${r.country}`,
            error: {
              isInvalid,
              feedback,
            },
          },
        });
      } else {
        setForm({
          ...form,
          location: {
            value: "",
            error: {
              isInvalid,
              feedback,
            },
          },
        });
      }
      return;
    }

    if (key === "dog_breed") {
      getDogImageList(value);
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

  // get dog image by the breed
  const getDogImageList = async (breed) => {
    if (!breed) {
      return;
    }

    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`).then(
      (r) => r.json()
    );
    setDogImageList(res.message.slice(0, 5));
  };

  // handle all input valid or not before submit
  const handleValiaAll = () => {
    setForm({
      ...form,
      dog_breed: {
        ...form.dog_breed,
        error: {
          isInvalid: !dog_breed.value,
          feedback: !dog_breed.value
            ? "Please Choose A dog breed!"
            : "Looks Goods!",
        },
      },
      dog_age: {
        ...form.dog_age,
        error: {
          isInvalid: !dog_age.value,
          feedback: !dog_age.value ? "Please Enter A dog age!" : "Looks Goods!",
        },
      },
      dog_size: {
        ...form.dog_size,
        error: {
          isInvalid: !dog_size.value,
          feedback: !dog_size.value
            ? "Please Choose A dog size!"
            : "Looks Goods!",
        },
      },
      rent_date: {
        ...form.rent_date,
        error: {
          isInvalid: !rent_date.value,
          feedback: !rent_date.value
            ? "Please Enter the walk start time!"
            : "Looks Goods!",
        },
      },

      rent_time: {
        ...form.rent_time,
        error: {
          isInvalid: !rent_time.value,
          feedback: !rent_time.value
            ? "Please Choose the walk time!"
            : "Looks Goods!",
        },
      },
      rent_duration: {
        ...form.rent_duration,
        error: {
          isInvalid: !rent_duration.value,
          feedback: !rent_duration.value
            ? "Please Choose the walk time!"
            : "Looks Goods!",
        },
      },
      location: {
        ...form.location,
        error: {
          isInvalid: !location.value,
          feedback: !location.value
            ? "Please Choose the walk time!"
            : "Looks Goods!",
        },
      },
    });
  };

  // create a order
  const onOrder = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    handleValiaAll();
    if (form.checkValidity() === true) {
      const data = {
        dog_breed: dog_breed.value,
        dog_age: dog_age.value,
        dog_size: dog_size.value,
        rent_start: `${rent_date.value} ${rent_time.value}`,
        rent_duration: rent_duration.value,
        location: location.value,
      };

      const res = await httpRequest("/orders/", "POST", data, true);
      if (res.id) {
        alert("Success!");
        navigate("/order");
      } else {
        setToastProps({
          bg: "error",
          title: "Error",
          visible: true,
          message: "got an error!",
        });
      }
    }
  };

  return (
    <Container className="pt-3 pb-4">
      <Toast
        {...toastProps}
        setVisible={() =>
          setToastProps({ ...toastProps, visible: !toastProps.visible })
        }
      />
      <Navbar />
      <h2 className="mb-3">Walk Dog</h2>
      <Form noValidate validated={validated} onSubmit={onOrder}>
        <Select
          label="Dog Breed"
          error={dog_breed.error}
          value={dog_breed.value}
          options={breeds}
          required
          onChange={(value) => handleFormChange("dog_breed", value)}
        />
        <div className="mb-3">
          <div className="mb-3">Dog Image</div>
          {dogImageList.length === 0 ? (
            <img src="/noimg.jpg" width={300} />
          ) : (
            <Carousel style={{ width: 300 }} interval={null}>
              {dogImageList.map((item, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={item} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <Input
          label="Dog age"
          error={dog_age.error}
          value={dog_age.value}
          required
          type="number"
          onChange={(value) => handleFormChange("dog_age", value)}
        />
        <Select
          label="Dog Size"
          error={dog_size.error}
          value={dog_size.value}
          options={dogSizeList}
          required
          onChange={(value) => handleFormChange("dog_size", value)}
        />
        <Input
          label="Walk Start Date"
          error={rent_date.error}
          value={rent_date.value}
          required
          type="date"
          onChange={(value) => handleFormChange("rent_date", value)}
        />
        <Input
          label="Walk Start Time"
          error={rent_time.error}
          value={rent_time.value}
          required
          type="time"
          onChange={(value) => handleFormChange("rent_time", value)}
        />
        <Select
          label="Walk Duration"
          error={rent_duration.error}
          value={rent_duration.value}
          options={rentDurationList}
          required
          onChange={(value) => handleFormChange("rent_duration", value)}
        />
        <Input
          label="Location"
          error={location.error}
          value={location.value}
          onChange={(value) => handleFormChange("location", value)}
        />
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Auto-detect my location"
            onChange={(e) => handleFormChange("autoDetect", e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Confirm
        </Button>
      </Form>
    </Container>
  );
}

export default Home;
