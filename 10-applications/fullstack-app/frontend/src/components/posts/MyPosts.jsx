import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import image1 from "./../../img/images/gallery/gallery-3.jpg"
import { useParams } from "react-router-dom";
import Footer from "../partials/Footer";
import Api from "../config/Api";
export default function MyPosts(){
    const [data, setData] = useState({});
    let id = useParams();
    useEffect(()=>{
        Api.get(`showArticle/${id.id}`).then(response =>{
           setData(response.data)
        })
    })
    return (
        <React.Fragment>
            <section id="home">
                <Container  className="h-100">
                    <Row className="h-100">
                        <Col md={6} className="h-100 d-flex flex-column justify-content-end text-white pb-5">
                            <h1>MonBlog</h1>
                            <p>Monblog &gt; Posts</p>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <h1 className="text-center py-5">About</h1>
                    <Row>
                        <Col md={6}>
                            <Image src= {image1} className="img-fluid img-thumbnail" style={{height:350 +'px'}}/>
                        </Col>
                        <Col md={6}>
                            <h2> {data.title} </h2>    
                            <h4>
                                {data.author}
                            </h4>
                            <p>
                                {data.description}
                            </p>
                        </Col>
                    </Row>
                </Container> 
            </section>
            <Footer/>
        </React.Fragment>
    )
}