import React, { useEffect, useState } from "react"
import {Card, Col, Container, Image, Row } from "react-bootstrap"
import image1 from "./../../img/images/gallery/gallery-4.jpg"
import image2 from "./../../img/images/gallery/gallery-5.jpg"
import image3 from "./../../img/images/gallery/gallery-8.jpg"
import Footer from "../partials/Footer"
import { Link } from "react-router-dom"
import Api from "../config/Api"
export default function Posts(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        Api.get("allpost").then((response)=>{
            setData(response.data)
        })

    },[])
    return(
        <React.Fragment>
            <section id="home">
                <Container  className="h-100">
                    <Row className="h-100">
                        <Col md={6} className="h-100 d-flex flex-column justify-content-end text-white pb-5">
                            <h1>MonBlog</h1>
                            <p>Monblog &gt; mes posts</p>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                </Container>
            </section>
            <section>
                <h1 className="text-center text-uppercase py-5">All posts</h1>
                <Container>
                    <Row>
                        {data.map((element, index)=>{
                        return(
                            <Col md={4} key={index +1} className="mb-4">
                                <Card>
                                    <Image src={element.image} className="img-fluid card-img-top" />
                                    <Card.Body>
                                        <Card.Title> {element.title} </Card.Title>
                                        <Card.Text>
                                            <h5> {element.author} </h5>
                                            <p>{element.description}</p>
                                            
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link to={"/myposts/" + (element.id)} className="btn btn-info btn-sm">En savoir plus </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                        })}
                    </Row>
                </Container>
            </section>
            <Footer/>
        </React.Fragment>
    )
}