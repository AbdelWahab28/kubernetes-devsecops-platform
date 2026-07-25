import { useCallback, useEffect, useState } from "react";
import {  Card, CardBody, CardHeader, Container, Table } from "react-bootstrap";
import { LiaEdit, LiaEye, LiaPlusSolid, LiaTrashAltSolid } from "react-icons/lia";
import Api from "../config/Api";
import { Link } from "react-router-dom";

export default function AdminPosts(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    let fetchData = useCallback(async ()=>{
        let response = await Api.get("allpost").then(res => res.data);
        setPosts(response);
        setLoading(false);
    },[]);
    useEffect(()=>{
        fetchData();
    }, [fetchData]);
    let handlDelete = (id)=>{
        Api.delete(`deleteArticle/${id}`).then(res =>{
            return res.data
        })
    }
    return (
        <Container fluid className="py-2"> 
            <Card style={{borderRadius:'.1rem'}}>
                <CardHeader className="d-flex justify-content-between">
                    <h3 className="card-title">Posts</h3>
                    <Link to="add" className="btn btn-warning"> <LiaPlusSolid/> Adds </Link>
                </CardHeader>
                <CardBody>
                    <div className="table-responsive my-2">
                        <Table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (<tr>Loading...., please</tr>): posts.map((element, index)=>{
                                    return(
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td> {element.title} </td>
                                            <td> {element.description.slice(0, 50) + '...'} </td>
                                            <td> {element.author} </td>
                                            <td>
                                                <Link to={"/myposts/" + (element.id)} className="btn btn-info btn-sm mx-1"> <LiaEye/> </Link>
                                                <Link to={"update/" + (element.id)} className="btn btn-outline-success btn-sm mx-1"> <LiaEdit/> </Link>
                                                <button href="#" className="btn btn-outline-danger btn-sm mx-1" onClick={()=> handlDelete(element.id)}> <LiaTrashAltSolid/> </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                               
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </Container>
    )
}