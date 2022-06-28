
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import './App.css';
import {BrowserRouter as Router, Route,  Routes, Navigate } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddBookComponent from './components/AddBookComponent';
import Table_Books from './components/TableBooks';
import ErrorPage from './components/ErrorPage';
import CategoryTable from "./components/CategoryTable";
import AddCategoryComponent from "./components/AddCategoryComponent";

const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const AuthAdminRoute = ({children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user.username !== "admin") {
    return <Navigate to="/books" replace/>
  }
  return children;
} 



function App() {  
  return (
    <div>
      <Router>
      <HeaderComponent/>
      <div className='container'>
        <Routes>
          <Route exact  path='/' element = {<Login/>}> </Route>
          <Route path='/books' element = {<AuthRoute><Table_Books/></AuthRoute>}> </Route>
          <Route path = '/add-book' element = {<AuthRoute><AddBookComponent/></AuthRoute>}> </Route>
          <Route path = "/edit-book/:id" element = {<AuthRoute><AddBookComponent/></AuthRoute>}></Route>
          <Route path = '/add-category' element = {<AuthRoute><AddCategoryComponent/></AuthRoute>}> </Route>
          <Route path = "/edit-category/:id" element = {<AuthRoute><AddCategoryComponent/></AuthRoute>}></Route>
          <Route path ="*" element= {<ErrorPage/>} > </Route>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/profile" element={<AuthRoute><Profile/></AuthRoute>} />
          <Route path = "/category" element={<AuthRoute><AuthAdminRoute><CategoryTable/></AuthAdminRoute></AuthRoute>} />
          <Route path="/user" element={<AuthRoute><BoardUser/></AuthRoute>} />
            <Route path="/admin" element={<AuthRoute><BoardAdmin/></AuthRoute>} />
        </Routes>
      </div>
      <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
