import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    function authenticate(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                retrieveUserDetails(data.accessToken);
                Swal.fire({
                    title: "Welcome to BalCer!",
                    icon: "success",
                    text: `You are now logged in. Explore our wide range of products and start shopping!`
                });
            } else if (data.error === "No Email Found") {
                Swal.fire({
                    title: "Email not found",
                    icon: "error",
                    text: "Please check your email and try again."
                });
            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Incorrect email or password. Please try again."
                });
            }
        });
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setUser({ 
                id: data._id, 
                isAdmin: data.isAdmin 
            });
        });
    };

    return (    
        (user.id) 
        ? 
            <Navigate to="/"/> 
        :
        <div className="bg-dark" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '5px'}}>
                            <h1 className="text-center" style={{ fontSize: '24px', marginBottom: '20px' }}>Login to start your shopping experience!</h1> 
                            <Form onSubmit={(e) => authenticate(e)}>
                                <Form.Group controlId="userEmail" className="mb-3"> 
                                    <Form.Label>Email address:</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-4"> 
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Password"
                                        onChange={togglePasswordVisibility}
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button 
                                        variant={isActive ? "primary" : "danger"} 
                                        type="submit" 
                                        id="submitBtn"
                                        disabled={!isActive}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                            <p className="mt-3 text-center" style={{ fontSize: '14px' }}>Don't have an account? <a href="/register">Register here</a></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
