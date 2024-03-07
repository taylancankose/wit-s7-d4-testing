import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

import axios from "axios";

const initialForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const errorMessages = {
  email: "Please enter a valid email address",
  name: "Name must be at least 3 characters long",
  surname: "Surname must be at least 3 characters long",
  password:
    "Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState(initialForm);
  const [data, setData] = useState();
  const pwCheck =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    setForm({ ...form, [name]: value });

    if (name == "email") {
      if (value.includes("@") && value.includes(".com")) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == "surname" || name == "name") {
      if (value.length > 2) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == "password") {
      if (pwCheck.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  useEffect(() => {
    if (
      form.name.length > 2 &&
      form.surname.length > 2 &&
      form.email.includes("@") &&
      form.email.includes(".com") &&
      pwCheck.test(form.password)
    )
      setIsValid(true);
    else setIsValid(false);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .post("https://reqres.in/api/users", form)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error))
        .finally(setForm(initialForm));
    }
  };
  console.log(isValid);
  console.log(form.name.length);
  console.log(form.surname.length);
  console.log(form.email.includes("@"));
  console.log(form.email.includes(".com"));
  console.log(pwCheck.test(form.password));
  return (
    <Form onSubmit={handleSubmit}>
      {data && <h1>ID: {data.id}</h1>}

      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          invalid={errors.name ? true : false}
          id="name"
          name="name"
          placeholder="Enter your name"
          type="name"
          onChange={handleChange}
          value={form.name}
          data-cy="name"
        />
        {errors.name && <FormFeedback>{errorMessages.name}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="surname">Surname</Label>
        <Input
          invalid={errors.surname ? true : false}
          id="surname"
          name="surname"
          placeholder="Enter your surname"
          type="surname"
          onChange={handleChange}
          value={form.surname}
          data-cy="surname"
        />
        {errors.surname && <FormFeedback>{errorMessages.surname}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          invalid={errors.email ? true : false}
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          data-cy="email"
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          invalid={errors.password ? true : false}
          id="password"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          data-cy="password"
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button
          id="registerBtn"
          disabled={!isValid ? true : false}
          color="primary"
        >
          Register
        </Button>
      </FormGroup>
    </Form>
  );
}
