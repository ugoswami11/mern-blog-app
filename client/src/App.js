import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import {UserContextProvider} from './UserContext';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import axios from 'axios';

axios.defaults.baseURL = "https://mern-blog-api-h79w.onrender.com";
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials= true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
