import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Button, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Pages.css";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Cart() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [ cart, setCart ] = useState([]);
    const [ products, setProducts ] = useState({});
    const [ totalPrice, setTotalPrice ] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setTotalPrice(data.cart.totalPrice);
            setCart(data.cart.cartItems);
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
    }, []);

    // function for getting product name for each product id
    const getName = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setProducts(prevProducts => ({
                ...prevProducts,
                [productId]: data.name // Store product name with productId as key
            }));
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
    }

    // function for checkout
    const checkout = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
        })
        .then(res => res.json())
        .then(data => {

            if (data.message === "Order created successfully") {
                Swal.fire({
                    title: "Order Successfully Created!",
                    icon: 'success',
                    text: "Order has been created. Proceeding to orders..."
                })

                navigate("/orders");
            } else {
                Swal.fire({
					title: "Something went wrong",
					icon: 'error',
					text: "Please try again."
				})	
            }
        })
    }

    useEffect(() => {
        // Loop through each cart item and fetch the corresponding product name
        cart.forEach(item => {
            getName(item.productId);
        });
    }, [cart]);

    return (
        (!localStorage.getItem('token')) 
        ? 
            <Navigate to="/"/> 
        :
            (user.isAdmin)
            ?
                <Navigate to="/error" />
            :
                cart && cart.length > 0
                ?
                    <div>
                        <h1 className="text-center py-5 text-light with-background-image">MY CART</h1>
            
                        <div className="cart-table-container">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr className="text-center">
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.productId}>
                                            <td>{products[item.productId]}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td>₱{item.subtotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="mt-3">Total Price: ₱{totalPrice}</h3>
                                <Button variant="primary" onClick={() => checkout()}>Checkout</Button>
                            </div>
                        </div>
                        <FeaturedProducts />
                    </div>
                :
                    <div>
                        <h1 className="text-center py-5 text-light with-background-image">No Cart Found</h1>

                        <div className="cart-table-container">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr className="text-center">
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>null</td>
                                        <td>null</td>
                                        <td>null</td>
                                    </tr>
                                </tbody>
                            </Table> 
                            
                            <div className="d-flex justify-content-between">
                                <h3 className="">Total Price: Php 0</h3>
                                <Button variant="primary" onClick={() => checkout()} disabled>Checkout</Button>
                            </div>
                        </div> 
                        <FeaturedProducts />
                    </div>
    );
}
