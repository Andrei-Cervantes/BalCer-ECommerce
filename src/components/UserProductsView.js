import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import { Col, Row } from "react-bootstrap";

export default function UserProductsView({ productsData }) {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => {
            // console.log(product)

            if (product.isActive === true) {
                return (
                    <Col sm={12} md={6} lg={4}>
                        <ProductCard productProp={product} key={product._id} />
                    </Col>
                )
            } else {
                return null;
            }
        })

        setProducts(productsArr)
    }, [productsData])

    return (
        <>
            <ProductSearch />
            <Row className="p-3 bg-dark text-light" style={{ width: '100%', margin: '0' }}>
                <h2 className="pt-4">All Products</h2>
                {products}
            </Row>
            
        </>
    )
}