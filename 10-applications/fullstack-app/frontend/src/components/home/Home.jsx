import React from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import image1 from "./../../img/images/gallery/gallery-5.jpg"
import Article from "./pages/Article"
import Contact from "./pages/Contact"
import Footer from "../partials/Footer"
function Home(){
    return (
        <React.Fragment>
            <section id="home">
                <Container className="h-100">
                    <Row className="h-100">
                        <Col md={6} className="h-100 d-flex flex-column justify-content-center">
                            <h1 className="text-white">🔵 BLUE-VERSION</h1>
                            {/* <p className="text-white">Bienvenu sur monblog.com</p> */}
                            {/* <a href="#" className="btn btn-info rounded-pill btn-lg text-uppercase py-2 px-3 ">Nous contacter</a> */}
                        </Col>
                        <Col md={6} >

                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section id="about" className="py-3 mt-3">
                <Container>
                    <h1 className="text-center py-5">About</h1>
                    <Row>
                        {/* <Col md={6}>
                            <h2>MonBlog.mg?</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero illum ipsam assumen.
                            <br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero illum ipsam assumen.<br/>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero illum ipsam assumen.</p>
                            <ul>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                                <li>Lorem ipsum dolor sit amet consectetur.</li>
                            </ul>
                        </Col> */}
                        <Col md={6}>
                            <Image src= {image1} className="img-fluid img-thumbnail" style={{height:350 +'px'}}/>
                        </Col>
                    </Row>
                </Container> 
            </section>
            <section id="article" className=" mb-5 ">
                <Article/>
            </section>
            <section id="contact" className=" mb-5 ">
                <Contact/>
            </section>
            <section>
                <Footer/>
            </section>
        </React.Fragment>
    )
}

export default Home