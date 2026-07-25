import { Container, Navbar } from 'react-bootstrap'
import { LiaBarsSolid, LiaCogSolid, LiaDashcube, LiaPage4, LiaUser } from 'react-icons/lia'
import { Link, Outlet } from 'react-router-dom'
export default function LayoutsAdmin(){
    return(
        <div id="admin" className=' bg-light '>
            <div className="sidebar d-flex flex-column shadow">
                <div className="logo" style={{height:"5rem"}}>
                    <h2>MonBlog</h2>
                </div>
                <div className="menu" style={{height:"inherit"}}>
                    <ul className="nav d-flex flex-column">
                        <li className="nav-item w-100">
                            <Link to="" className="nav-link"> <LiaDashcube/> Dashbord</Link>
                        </li>
                        <li className="nav-item w-100">
                            <Link to="articles" className="nav-link"> <LiaPage4/> Article</Link>
                        </li>
                        <li className="nav-item w-100">
                            <a href="#" className="nav-link"> <LiaUser/> Users</a>
                        </li>
                        <li className="nav-item w-100">
                            <a href="#" className="nav-link"> <LiaCogSolid/> Setting</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="adminContent d-flex flex-column">
                <Navbar expand bg='light' className='shadow-sm' color='navbar-dark' style={{height:"5rem"}}>
                    <Container>
                        <Navbar.Brand> <LiaBarsSolid/> </Navbar.Brand>
                    </Container>
                </Navbar>
                <div className="contentBody" style={{height:"inherit", overflowY:"auto"}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}