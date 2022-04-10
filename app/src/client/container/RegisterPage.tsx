import { useState } from "react";
import axios from "axios";
import {
  InputGroup,
  InputGroupText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import Router from "next/router";

axios.defaults.withCredentials = true;

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  function register() {
    if (password !== passwordConfirm) {
      alert("password !== passwordConfirm");
      return;
    }
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/register`,
            { email, password, name },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response.data);
            alert("登録完了");
			Router.push('/login')
          });
      });
  }
  return (
    <div className="container shadow-lg p-3 mb-5 mt-3 bg-body rounded">
      <div>
        <InputGroup className="m-2">
          <InputGroupText>Email</InputGroupText>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="m-2">
          <InputGroupText>Name</InputGroupText>
          <Input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="m-2">
          <InputGroupText>Password</InputGroupText>
          <Input
            type="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="m-2">
          <InputGroupText>PasswordConfirm</InputGroupText>
          <Input
            type="password"
            placeholder="password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </InputGroup>
        <Button onClick={register} variant="primary" outline className="m-2">
          Register
        </Button>
      </div>
    </div>
  );
}
