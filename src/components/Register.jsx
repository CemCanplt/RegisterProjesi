import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const initialState = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

const errorMessages = {
  ad: "Adınız en az 3 karakter olmalıdır.",
  soyad: "Soyadınız en az 3 karakter olmalıdır.",
  email: "Lütfen geçerli bir mail girin.",
  password: "Şifreniz en az 8 karakter olmak zorundadır.",
};

const initialErrors = {
  ad: false,
  soyad: false,
  email: false,
  password: false,
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const errorsValues = Object.values(errors);
    const isTrue = errorsValues.includes(true);
    // isTrue false ise geçireceğim
    if (isTrue) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "password") {
      if (validatePassword(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "ad") {
      if (value.length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "soyad") {
      if (value.length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  // yardımcı fonksiyon - mail kontrol
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // yardımcı fonksiyon - şifre kontrol
  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setId(res.data.id);
        setFormData(initialState);
      })
      .catch((error) => console.log("GİTMEDİ HATA", error));
  };

  return (
    <>
      <Card>
        <CardHeader>Kayıt Olma</CardHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="ad">Ad</Label>
            <Input
              id="ad"
              name="ad"
              placeholder="Adınızı Giriniz"
              type="text"
              onChange={handleChange}
              value={formData.ad}
              invalid={errors.ad}
              data-cy="ad-input"
            />
            <FormFeedback data-cy="ad-err">{errorMessages.ad}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="soyad">Soyad</Label>
            <Input
              id="soyad"
              name="soyad"
              placeholder="Soyad Giriniz"
              type="text"
              onChange={handleChange}
              value={formData.soyad}
              invalid={errors.soyad}
              data-cy="soyad-input"
            />
            <FormFeedback>{errorMessages.soyad}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email Giriniz"
              type="email"
              onChange={handleChange}
              value={formData.email}
              invalid={errors.email}
              data-cy="email-input"
            />
            <FormFeedback>{errorMessages.email}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Şifre Giriniz"
              type="password"
              onChange={handleChange}
              value={formData.password}
              invalid={errors.password}
              data-cy="password-input"
            />
            <FormFeedback>{errorMessages.password}</FormFeedback>
          </FormGroup>
          <Button disabled={!isValid}>Kayıt Ol</Button>
        </Form>
      </Card>
      <h1>{id}</h1>
    </>
  );
}

export default Register;
