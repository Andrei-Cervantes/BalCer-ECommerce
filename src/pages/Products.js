import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import AdminDashboard from "../components/AdminDashboard";
import UserProductsView from "../components/UserProductsView";
import { Row } from "react-bootstrap";

export default function Products() {

    const { user } = useContext(UserContext);
    // console.log(user);

    const [ products, setProducts ] = useState([]);

    const fetchData = () => {
        let fetchUrl = user.isAdmin === true
            ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
            : `${process.env.REACT_APP_API_BASE_URL}/products/`

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
		.then(data => {
			// console.log(data)

			if(typeof data.message !== "string") {
				setProducts(data);
			} else {
				setProducts([]);
			}
		})
    }

    useEffect(() => {
        fetchData();
        // console.log(user)
    }, [user])

    return (
        user.isAdmin === true
        ?
            <AdminDashboard productsData={products} fetchData={fetchData} />
        :
            <Row>
                <h1 className="text-center py-5 bg-dark text-light">OUR PRODUCTS</h1>
                <UserProductsView productsData={products} />
            </Row>
            
    )
}