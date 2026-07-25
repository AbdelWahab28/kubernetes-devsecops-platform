import React from "react";
import { Col, Container, Row } from "react-bootstrap";
export default function Header(props){
    return(
        <React.Fragment>
            <section id="home">
                <Container  className="h-100">
                    <Row className="h-100">
                        <Col md={6} className="h-100 d-flex flex-column justify-content-end text-white pb-5">
                            <h1>MonBlog</h1>
                            <p>Monblog &gt; {props}</p>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}