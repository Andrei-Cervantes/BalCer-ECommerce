import { useEffect, useState } from 'react';
import './App.css';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components import
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Error from './pages/Error';
import Orders from './pages/Orders';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import AppFooter from './components/AppFooter';

function App() {

  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  // Clear localStorage
  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);

      if (data) {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, []);


  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid className='p-0 m-0'>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<Error />} />
          </Routes>
          <AppFooter />
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
