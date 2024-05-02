import { useContext, useEffect, useState } from "react";
import { Col, Row, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function ProductView() {

    const { user } = useContext(UserContext);
    console.log(user);

    const navigate = useNavigate();

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [ quantity, setQuantity ] = useState(0);

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

    const fetchProduct = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const addToCart = (productId) => {
        if (quantity === 0) {
            Swal.fire({
                title: "Invalid Quantity",
                icon: 'warning',
                text: "Quantity is 0! Click the plus button to add more."
            })
        } else {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    cartItems: [
                        {
                            productId: productId,
                            quantity: quantity
                        }
                    ]
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
                if (data.message === 'Products added to cart successfully') {
                    Swal.fire({
                        title: "Successfully Added to Cart!",
                        icon: 'success',
                        text: "You have successfully added this product to the cart."
                    })
                    navigate("/products");

                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: 'error',
                        text: "Please try again."
                    })				
                }
            })
        }
        
    }

    return (
        <div>
            {product ? (
                <Card className="m-5">
                    <Card.Body>
                        <Card.Title className="text-center bg-dark p-2 text-light"><h3 className="mb-0">{product.name}</h3></Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>Price: <span className="text-info">₱{product.price}</span></Card.Text>
                        <Form className="mb-3">
                            <Form.Group controlId="quantityInput">
                                <Form.Label className="me-2">Quantity:</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Button variant="dark" onClick={() => setQuantity(quantity <= 0 ? 0 : quantity - 1)}>-</Button>
                                    <Form.Control 
                                        type="number"
                                        required
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        style={{ width: '100px' }}
                                    />
                                    <Button variant="dark" onClick={() => setQuantity(quantity + 1)}>+</Button>
                                </div>
                            </Form.Group>
                        </Form>
                        <div className="col-12">
                            { user.id !== null
                                ?
                                    user.isAdmin
                                        ?
                                        <Button variant="warning" onClick={() => addToCart(productId)} className="w-100" disabled>Admin cannot Add to Cart</Button>
                                        :
                                        <Button variant="primary" onClick={() => addToCart(productId)} className="w-100">Add to Cart</Button>
                                :
                                    <Link className="btn btn-danger w-100" to="/login">Log in to Checkout</Link>
                            }
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    <Col className="p-5 text-center">
                        <h1>404 - Not found</h1>
                        <p>The product you are looking for cannot be found</p>
                        <Link className="btn btn-primary" to={"/products"}>Back to products</Link>
                    </Col>
                </Row>
            )}
        </div>
    );
}
