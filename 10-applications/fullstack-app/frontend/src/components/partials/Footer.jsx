import { Col, Container, Row } from "react-bootstrap";
export default function Footer(){
    return(
        <footer>
            <Container className="h-100">
                <Row className="h-100">
                    <Col md={4}></Col>
                    {/* <Col md={4} className="d-flex text-dark justify-content-center align-items-center h-100">
                        <p>Copyright &copy; monblog.mg 2023</p>
                    </Col> */}
                    <Col md={4}></Col>
                </Row>
            </Container>
        </footer>
    )
}