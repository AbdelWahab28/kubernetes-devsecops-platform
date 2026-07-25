import { useState } from "react";
import {Card,CardBody,CardFooter,CardHeader,Container,FloatingLabel,Form,} from "react-bootstrap";
import { LiaDatabaseSolid } from "react-icons/lia";
import Api from "../config/Api";

export default function AddPosts() {
  const [data, setData] = useState({})
  let handlChange = event =>{
    setData({...data, [event.target.name]:event.target.value})
  }
  let handlSubmit = ()=>{
    Api.post("postsArticle", data).then(response =>{
      return response.data;
    })
  }
  return (
    <Container className="py-2" fluid>
      <Card>
        <CardHeader>
          <h3>Add Posts</h3>
        </CardHeader>
        <CardBody>
          <Form>
            <FloatingLabel
              label="Post Title"
              controlId="title"
              className="mb-2"
            >
              <Form.Control type="text" placeholder="post title" value={data.title} name="title" onChange={handlChange}/>
            </FloatingLabel>
            <FloatingLabel
              label="Post author"
              controlId="author"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="post author"
                name="author" value={data.author} onChange={handlChange}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Post description"
              controlId="description"
              className="mb-2"
            >
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                placeholder="description"
                name="description" value={data.description} onChange={handlChange}
              />
            </FloatingLabel>
          </Form>
        </CardBody>
        <CardFooter>
            <button className="btn btn-info text-white text-uppercase btn-md" onClick={handlSubmit}> <LiaDatabaseSolid/> save</button>
        </CardFooter>
      </Card>
    </Container>
  );
}
