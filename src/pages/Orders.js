import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import AdminOrdersView from "../components/AdminOrdersView";
import UserOrdersView from "../components/UserOrdersView";
import { Navigate } from "react-router-dom";

export default function Orders() {

    const { user } = useContext(UserContext);

    const [ orders, setOrders ] = useState([]);
    // console.log(orders);

    const fetchData = () => {
        let fetchUrl = user.isAdmin
            ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`
            : `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`

        fetch(fetchUrl, {
            headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
        })
        .then(res => res.json())
		.then(data => {
			// console.log(data)
            setOrders(data.orders);
		})
    }

    useEffect(() => {
        fetchData();
        // console.log(user)
    }, [user]);

    return (
        (!localStorage.getItem('token')) 
        ? 
            <Navigate to="/"/> 
        :
            (user.isAdmin)
            ?
                <AdminOrdersView ordersData={orders} fetchData={fetchData} />
            :
                <UserOrdersView ordersData={orders} />
    )
}