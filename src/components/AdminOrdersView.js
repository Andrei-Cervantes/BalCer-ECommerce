import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function AdminView({ ordersData, fetchData }) {

    // console.log(ordersData);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProductNames = async () => {
            const updatedOrders = await Promise.all(ordersData.map(async order => {
                const productsWithNames = await Promise.all(order.productsOrdered.map(async product => {
                    const productData = await fetchProductData(product.productId);
                    return { ...product, name: productData.name };
                }));
                return { ...order, productsOrdered: productsWithNames };
            }));
            setOrders(updatedOrders);
        };

        fetchProductNames();
    }, [ordersData]);

    const fetchProductData = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return { name: 'Unknown' }; // Default name if fetching fails
        }
    };

    if (!ordersData || ordersData.length === 0 || orders.length === 0) { 
        return (
            <div>
                <h1 className="text-center py-5 bg-dark text-light with-background-image">ALL ORDERS</h1>
                    <div className="noOrder-table-container">
                        <div className="d-flex justify-content-between">
                            <h2>Order ID: no ID found</h2>
                            <h4><span className="badge rounded-pill bg-warning text-dark">no status</span></h4>
                        </div>

                        <h3>Products Ordered:</h3>
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
                                        <td className="text-center">null</td>
                                        <td>₱0</td>
                                    </tr>
                            </tbody>
                        </Table>
                        <h3 className="text-end">Total Price: ₱0</h3>
                    </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-center py-5 bg-dark text-light with-background-image">ALL ORDERS</h1>
            {orders.map(order => (
                <div className="order-table-container" key={order._id}>
                    <div className="d-flex justify-content-between">
                        <h2>Order ID: {order._id}</h2>
                        <h4><span className="badge rounded-pill bg-warning text-dark">{order.status}</span></h4>
                    </div>
                    
                    <h3>Products Ordered:</h3>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr className="text-center">
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.productsOrdered.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td className="text-center">{product.quantity}</td>
                                    <td>₱{product.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h3 className="text-end">Total Price: ₱{order.totalPrice}</h3>
                </div>
            ))}
        </div>
    );
}