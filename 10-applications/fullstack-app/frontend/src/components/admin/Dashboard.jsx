import { Card, CardBody, Col, Container, Row, Table } from "react-bootstrap";
import { LiaEdit } from "react-icons/lia";

export default function Dashboard(){
    return (
        <Container className="p-2">
            <Row>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <p className="card-text">5</p>
                            <h3>Users</h3>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <p className="card-text">5</p>
                            <h3>Postes</h3>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <p className="card-text">5</p>
                            <h3>Visiteurs</h3>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div className="table-responsive my-2">
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Djouneid</td>
                            <td>djouneidmed@gmail.com</td>
                            <td>
                                <a href="#" className="btn btn-info btn-sm"> <LiaEdit/> </a>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}