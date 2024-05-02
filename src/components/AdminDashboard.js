import { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";
import CreateProduct from "./CreateProduct";

export default function AdminDashboard({ productsData, fetchData }) {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => {
            // console.log(product);
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td className="text-center">₱{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td className="text-center"><EditProduct product={product._id} fetchData={fetchData}/> <ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>
                </tr>
            )
        })

        setProducts(productsArr);
    }, [productsData, fetchData])

    return (
        <Row>
            <h1 className="text-center py-5 bg-dark text-light"> Admin Dashboard</h1>
            <div className="text-center my-3">
                <CreateProduct fetchData={fetchData} />
                <Link className="btn btn-success m-1" to="/orders">Show User Orders</Link>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table> 
        </Row>
    )
}