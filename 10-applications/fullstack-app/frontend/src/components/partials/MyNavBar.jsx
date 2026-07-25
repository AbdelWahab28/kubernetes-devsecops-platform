import React, { useState } from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';


function MyNavBar() {
  const [isScroll, setScroll] = useState(false);
  const handelScroll = () =>{
    if(window.scrollY > 70){
      setScroll(true)
    }else{
      setScroll(false)
    }
  }
  window.addEventListener('scroll', handelScroll);
  return (
    <React.Fragment>
        <Navbar expand="lg" className={!isScroll ? "bg-transparent navbar-dark" : "navbar-light bg-light shadow"} fixed='top' >
        <Container>
            <Navbar.Brand href="#home">Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Acceuil</Nav.Link>
                    <Nav.Link href="#about">A propos</Nav.Link>
                    <Nav.Link href="#article">Article</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                    {/* <Nav.Link href="admin">Connexion</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </React.Fragment>
  );
}

export default MyNavBar;