import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader,CardFooter, Container, FloatingLabel, Form } from 'react-bootstrap';
import { LiaDatabaseSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';
import Api from '../config/Api';

function UpdateArticle() {
    const [data, setData] = useState({});
    let id = useParams();
    useEffect(()=>{
        Api.get(`showArticle/${id.id}`).then(resp =>{
            setData(resp.data);
        })
    })

    const [donne, setDonne] = useState({});
    let handleChange = event=>{
        setDonne({...donne, [event.target.name]:event.target.value})
    }
    let handlSubmit = ()=>{
        Api.put(`updateArticle/${id}`, donne).then(res =>{
            res.donne
        })
    }
    return (
       <Container className='py-2'>
            <Card>
                <CardHeader>
                    <h3>Modiffier</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FloatingLabel label="Titre de post" controlId='title' className='mb-2'>
                            <Form.Control type='text' name='title' value={data.title} onChange={handleChange}/>
                        </FloatingLabel>
                        <FloatingLabel label="Auteur" controlId='author' className='mb-2'>
                            <Form.Control type='text' name='author' value={data.author} onChange={handleChange}/>
                        </FloatingLabel>
                        <FloatingLabel label="Description" controlId='description'  className='mb-2'>
                            <Form.Control as='textarea' style={{height:"200px"}} name='description' value={data.description} onChange={handleChange}/>
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

export default UpdateArticle;