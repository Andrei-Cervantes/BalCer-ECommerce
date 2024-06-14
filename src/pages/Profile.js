import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import { Navigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Profile() {

    const { user } = useContext(UserContext);

    const [ details, setDetails ] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // Set user state values with user details upon login
            if (data._id) {
                setDetails(data);
            } else if (data.message === 'User not found') {
                Swal.fire({
                    title: "User not found",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                })
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                })
            }
        })
    }, []);

    return(
        (!localStorage.getItem('token'))
        ?
            <Navigate to="/login" />
        :
            (user.isAdmin)
            ?
                <Navigate to="/error" />
            :
            <>
                <Row>
                    <Col className="p-5 text-white with-background-image">
                        <div className="p-5 bg-secondary">
                            <h1 className="my-5 text-center">PROFILE</h1>
                        </div>
                        <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                        <hr />
                        <h4>Contacts</h4>
                        <ul>
                            <li>Email: {details.email}</li>
                            <li>Mobile No: {details.mobileNo}</li>
                        </ul>
                    </Col>
                </Row>
                <Row className='p-4 m-4'>
                    <Col>
                        <ResetPassword />
                    </Col>
                </Row>
            </>
    )
}