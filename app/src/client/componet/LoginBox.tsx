import { useState } from "react";
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

const LoginBox = () => {
  return (
    <div className="container shadow-lg p-3 mb-5 mt-3 bg-body rounded">
	  <div>
		<InputGroup className="m-2">
          <InputGroupText>user id</InputGroupText>
          <Input placeholder="name or email" />
		</InputGroup>
		<InputGroup className="m-2">
          <InputGroupText>password</InputGroupText>
          <Input placeholder="password" type="password" />
		</InputGroup>
		<Button variant="primary" outline className="m-2">Login</Button>
      </div>
	</div>
  );
};

export default LoginBox;
