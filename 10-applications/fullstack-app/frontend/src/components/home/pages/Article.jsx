import { Container, Row,Image, Col, Card } from "react-bootstrap";
import image1 from "./../../../img/images/gallery/gallery-1.jpg";
import image2 from "./../../../img/images/gallery/gallery-2.jpg";
import image3 from "./../../../img/images/gallery/gallery-3.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Article(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        const articles = [
            {
                title:"Article 1",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptatibus veniam temporibus esse aut consequuntur porro quod tempora maiores. odit?",
                image:image1
            },
            {
                title:"Article 1",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptatibus veniam temporibus esse aut consequuntur porro quod tempora maiores. odit?",
                image:image2
            },
            {
                title:"Article 1",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptatibus veniam temporibus esse aut consequuntur porro quod tempora maiores. odit?",
                image:image3
            }
        ]
        setData(articles);
    },[])
    return(
        <section id="articles">
            <h1 className="text-center py-5">Articles</h1>
            <Container>
                <Row>
                    {data.map((element, index)=>{
                       return(
                        <Col md={4} key={index +1} >
                            <Card>
                                <Image src={element.image} className="img-fluid card-img-top" />
                                <Card.Body>
                                    <Card.Title> {element.title} </Card.Title>
                                    <Card.Text>
                                        <p>{element.description}</p>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to={"/myposts/" + (index +1)} className="btn btn-info btn-sm">En savoir plus </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                       )
                    })}
                </Row>
                <Row>
                    <Col md={6}></Col>
                    <Col md={6} className="d-flex justify-content-end align-items-center py-3">
                        <Link to={"posts"} className="text-decoration-none text-black-50 text-uppercase">See more</Link>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Article