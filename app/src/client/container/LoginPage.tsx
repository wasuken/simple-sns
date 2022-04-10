import { useState } from "react";
import Router from "next/router";
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
import { useUser } from "../context/user";

export default function LoginPage() {
  const user = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function login() {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/sanctum/csrf-cookie`, {
        withCredentials: true,
      })
      .then((response) => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/login`,
            { email, password },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response.data);
            user.setLogin(response.status === 200);
            Router.push("/");
          });
      });
  }
  return (
    <div className="container shadow-lg p-3 mb-5 mt-3 bg-body rounded">
      <div>
        <InputGroup className="m-2">
          <InputGroupText>user id</InputGroupText>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="m-2">
          <InputGroupText>password</InputGroupText>
          <Input
            type="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button onClick={login} variant="primary" outline className="m-2">
          Login
        </Button>
      </div>
    </div>
  );
}
