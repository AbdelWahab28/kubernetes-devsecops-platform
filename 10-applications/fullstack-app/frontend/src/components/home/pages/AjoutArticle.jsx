import React from "react";
import { Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";

export default function AjoutArticle()
{
    return (
        <React.Fragment>
            <section id="ajouter">
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <Card>
                                <CardBody>
                                    <Form>
                                        
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}