import { useContext, useEffect } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import UserContext from "../UserContext"
import logoImage from "../assets/navbar-logo.png";


export default function AppNavbar() {

    const { user, setUser } = useContext(UserContext);
    // console.log(user);

	useEffect(() => {
		fetch(`${process.env.API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		
			if (data.user) {
				setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin
				})
			} else {
				setUser({
				id: null,
				isAdmin: null
				})
			}
		})
	}, [])

    return (
		<Navbar bg="warning" expand="lg" className="p-0">
		  <Container fluid>
		  <Navbar.Brand as={Link} to="/">
		  	<img
				src={logoImage}
				alt="Logo"
				height="40"
				className="d-inline-block align-top"
            />{' '}
		  </Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		        	<Nav className="ms-auto">
				        <Nav.Link as={NavLink} to="/">Home</Nav.Link>

				        {(localStorage.getItem('token'))
				        	?
								(user.isAdmin)
								?
									<>
										<Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
										<Nav.Link as={NavLink} to="/products">Dashboard</Nav.Link>
										<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
									</>
								:
									<>
										<Nav.Link as={NavLink} to="/products">Products</Nav.Link>
										<Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
										<Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
										<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
										<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
									</>
				        	:
								<>
									<Nav.Link as={NavLink} to="/products">Products</Nav.Link>
									<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
									<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
								</>
				        }
		        	</Nav>
		         </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}