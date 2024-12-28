import { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  Form,
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

function Register() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("", formData)
      .then(() => {
        
      })
      .catch((error) => console.log("GİTMEDİ HATA", error));
  };

  return (
    <Card>
      <CardHeader>Kayıt Olma</CardHeader>
      <Form>
        <FormGroup>
          <Label for="ad">Ad</Label>
          <Input
            id="ad"
            name="ad"
            placeholder="Adınızı Giriniz"
            type="text"
            onChange={handleChange}
            value={formData.ad}
          />
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
          />
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
          />
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
          />
        </FormGroup>
        <Button>Kayıt Ol</Button>
      </Form>
    </Card>
  );
}

export default Register;
