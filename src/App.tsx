import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdHome, MdShoppingBag, MdShoppingCart } from "react-icons/md";
import { Link, Outlet } from "react-router";
import Badge from "react-bootstrap/Badge";

import "./App.css";
import { useAppSelector } from "./hooks/redux-hooks";

function App() {
  const wishlist = useAppSelector(state=>state.wishlist.list)
  return (
    <>
      {/* //-------------start navbar ---------------- */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Ecommerce
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdHome />
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/wishlist"
              className="d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdShoppingBag />
              Wishlist{" "}
              <Badge bg="danger" text="dark">
                {wishlist?.length}
              </Badge>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdShoppingCart />
              Cart
              <Badge bg="warning" text="dark">
                56
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* ; //-------------end navbar ---------------- */}

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
