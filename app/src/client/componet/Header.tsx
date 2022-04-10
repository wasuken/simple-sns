import { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { HeaderProps } from "../types/type";

export default function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Simple SNS</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {props.login ? (
              <NavItem>
                <NavLink href="/comments" >Commnets</NavLink>
              </NavItem>
            ) : (
              ""
            )}
            {props.login ? (
              <NavItem>
                <NavLink href="/follows" >Follows</NavLink>
              </NavItem>
            ) : (
              ""
            )}
            {props.login ? (
              <NavItem>
                <NavLink href="/users" >Users</NavLink>
              </NavItem>
            ) : (
              ""
            )}
			{props.login ? (
              <NavItem>
                <NavLink href="/posts" >Posts</NavLink>
              </NavItem>
            ) : (
              ""
            )}

            {props.login ? (
              ""
            ) : (
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            )}
            {props.login ? (
              ""
            ) : (
              <NavItem>
                <NavLink href="/register" >Register</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
