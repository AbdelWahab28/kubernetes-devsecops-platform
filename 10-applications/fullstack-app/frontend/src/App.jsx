import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layouts from './components/layout/Layouts';
import Home from './components/home/Home';
import Posts from './components/posts/Posts';
import MyPosts from './components/posts/MyPosts';
import LayoutsAdmin from './components/layout/LayoutsAdmin';
import Dashboard from './components/admin/Dashboard';
import AdminPosts from './components/admin/AdminPosts';
import AddPosts from './components/admin/AddPosts';
import UpdateArticle from './components/admin/updateArticle';


const router = createBrowserRouter(
  [
    {
      path: '',
      element:< Layouts />,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"/posts",
          element:<Posts/>
        },
        {
          path:"/myposts/:id",
          element:<MyPosts/>
        }
      ]

    },
    {
       // ROUTES Admin

      path:"admin",
      element:<LayoutsAdmin/>,
      children:[
        {
          path:"",
          element: <Dashboard/>
        },
        {
          path:"articles",
          element: <AdminPosts/>
        },
        {
          path:"articles/add",
          element:<AddPosts/>
        },
        {
          path:"articles/update/:id",
          element:<UpdateArticle/>
        }
      ]
    }
  ]
)

function App() {
  
  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App
