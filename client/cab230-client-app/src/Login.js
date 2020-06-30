import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
  Row,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Login() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const API_URL = "http://131.181.190.87:3000/user/login";

  const submit = e => {
    e.preventDefault();
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          localStorage.setItem("token", data.token);
          history.push("/stocks/symbols");
        }
      });
  };

  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12">
          <Navbar className="custNav navbar-inverse bg-info" expand="md">
            <NavbarBrand href="/" className="text-white">
              Home
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/stocks/symbols" className="text-white">
                  Stock List
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="rightNav ml-auto" navbar>
              <Link to="/user/register">
                <Button
                  color="info"
                  type="registerButton"
                  class="button"
                  width="200p"
                  className="float-right"
                >
                  Register
                </Button>
                {"  "}
              </Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <center>
        <span className="block-example border border-info">
          <Container>
            <Col xs="8">
              <h4 className="text-info">Login Form</h4>
            </Col>
            <Form>
              <Row form>
                <Col sm={{ size: 6, order: 2, offset: 3 }}>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Enter Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 6, order: 3, offset: 3 }}>
                  <FormGroup row>
                    <Label for="examplePassword" sm={2}>
                      Password
                    </Label>

                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Enter Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Col sm={{ size: 5, order: 1, offset: -2 }}>
                <Button
                  id="login-button"
                  type="submit"
                  color="info"
                  block
                  onClick={submit}
                >
                  Login
                </Button>

                <Link to="/user/register"> Not a member? Register now!</Link>
              </Col>
            </Form>
          </Container>
        </span>
      </center>
    </div>
  );
}
