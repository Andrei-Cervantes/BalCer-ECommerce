import { useState } from "react";
import ProductCard from "./ProductCard";
import { Col, Row } from "react-bootstrap";

export default function ProductSearch() {
    const [searchNameQuery, setSearchNameQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchNameResults, setSearchNameResults] = useState([]);
    const [searchPriceResults, setSearchPriceResults] = useState([]);

    const handleSearchByName = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByName`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productName: searchNameQuery })
            });
            const data = await response.json();
            setSearchNameResults(data);
        } catch (error) {
          console.error('Error searching for products by name:', error);
        }
    };

    const handleSearchByPriceRange = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByPrice`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ minPrice, maxPrice })
            });
            const data = await response.json();
            setSearchPriceResults(data);
        } catch (error) {
          console.error('Error searching for products by price range:', error);
        }
    };

    return (
        <div className="p-3">
            <Row>
                <Col>
                    <h2>Search Products</h2>
                    <hr />
                </Col>
            </Row>

            <Row className="px-5">
                {/* Search by Name */}
                <Col sm={12} md={6}>
                    <h4>Search by Name</h4>
                    <div className="form-group pb-3">
                        <label htmlFor="productName" className="d-flex">Product Name:
                            <input
                                type="text"
                                id="productName"
                                className="form-control"
                                placeholder="Enter product name here"
                                value={searchNameQuery}
                                onChange={event => setSearchNameQuery(event.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleSearchByName}>
                                Search
                            </button>
                        </label>
                    </div>  
                    {searchNameResults.length > 0 && (
                        <>
                            <h4>Search Results by Name:</h4>
                            <ul>
                                {searchNameResults.map(product => (
                                    <ProductCard productProp={product} key={product._id} />
                                ))}
                            </ul>
                        </>
                    )}
                </Col>

                {/* Search by Price Range */}
                <Col sm={12} md={6}>
                    <h4>Search by Price Range</h4>
                    <div className="d-flex">
                        <div className="form-group pb-3">
                            <label htmlFor="minPrice" className="d-flex">Minimum Price:
                                <input
                                    type="number"
                                    id="minPrice"
                                    placeholder="Enter Min Price"
                                    className="form-control"
                                    value={minPrice}
                                    onChange={event => setMinPrice(event.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxPrice" className="d-flex">Maximum Price:
                                <input
                                    type="number"
                                    id="maxPrice"
                                    placeholder="Enter Max Price"
                                    className="form-control"
                                    value={maxPrice}
                                    onChange={event => setMaxPrice(event.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handleSearchByPriceRange}>
                                    Search
                                </button>
                            </label>
                        </div>
                    </div>
                    
                    
                    {searchPriceResults.length > 0 && (
                        <>
                            <h4>Search Results by Price Range:</h4>
                            <ul>
                                {searchPriceResults.map(product => (
                                    <ProductCard productProp={product} key={product._id} />
                                ))}
                            </ul>
                        </>
                    )}
                </Col>
            </Row>
        </div>
        

    );  
}