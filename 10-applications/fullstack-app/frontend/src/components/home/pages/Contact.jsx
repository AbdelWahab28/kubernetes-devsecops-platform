import React from "react";
import { Card, CardBody, Col, Container, FloatingLabel, Form, FormControl, Row } from "react-bootstrap";
import {FaGoogle, FaMapPin, FaPhone} from "react-icons/fa";
export default function Contact (){
    return(
        <React.Fragment>
            <section id="contact">
            <h1 className="text-center text-uppercase py-5" >Contact</h1>
                <Container>
                    <Row className="pb-4">
                        <Col md={6} className="d-flex flex-column gap-2 justify-content-center" >
                            <div style={{width:"400px", height:"50px"}} className="card d-flex flex-row align-items-center px-3 text-white">
                                <FaPhone/>&nbsp; <span>+261 70 299 43</span>
                            </div>
                            <div style={{width:"400px", height:"50px"}} className="card d-flex flex-row align-items-center px-3 text-white">
                                <FaMapPin/>&nbsp; <span>II N 125 Anjanahary</span>
                            </div>
                            <div style={{width:"400px", height:"50px"}} className="card d-flex flex-row align-items-center px-3 text-white">
                                <FaGoogle/>&nbsp; <span>test@gmail.com</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <CardBody>
                                    <Form>
                                        <FloatingLabel label= "Votre nom"  className="mb-2">
                                            <FormControl  type="text" placeholder="username" name="username" id="username" />
                                        </FloatingLabel>
                                        <FloatingLabel label= "Votre email"  className="mb-2">
                                            <FormControl  type="text" placeholder="email" name="email" id="email" />
                                        </FloatingLabel>
                                        <FloatingLabel label= "Votre subject" className="mb-2">
                                            <FormControl  type="text" placeholder="subject" name="subject" id="subject" />
                                        </FloatingLabel>
                                        <FloatingLabel label= "Votre message" className="mb-2">
                                            <FormControl  as={"textarea"} style={{height:"100px"}} placeholder="message" name="message" id="message" />
                                        </FloatingLabel>
                                        
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}