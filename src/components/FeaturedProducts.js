import { useState, useEffect } from 'react';
import { CardGroup, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetchFeaturedProducts(); 
        const intervalId = setInterval(fetchFeaturedProducts, 15000); 

       
        return () => clearInterval(intervalId);
    }, []); 

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.status === 304) {
                // Resource not modified, no need to update
                return;
            }
    
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
    
            const data = await response.json();
    
            const shuffledProducts = data.sort(() => Math.random() - 0.5);
            const newFeaturedProducts = shuffledProducts.slice(0, 5);
    
            setFeaturedProducts(newFeaturedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    

    return (
        <Row className='bg-dark text-light'>
            <h2 className="text-center py-3">Available Products</h2>
            <CardGroup className="justify-content-center">
                {featuredProducts.map((product) => (
                    <ProductCard key={product._id} productProp={product} />
                ))}
            </CardGroup>
        </Row>
    );
}
