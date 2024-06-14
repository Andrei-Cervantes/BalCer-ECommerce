import { useContext, useEffect, useState } from "react"
import UserContext from "../UserContext"
import { Navigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Register() {
    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmShowPassword(!showConfirmPassword);
    }

    useEffect(() => {
        if ((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword])

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message === "Registered Successfully") {
                Swal.fire({
                    title: "Successfully Registered",
                    icon: "success",
                    text: "Welcome to BalCer ECommerce Shop!",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/login";
                    }
                });
            } else if (data.error === "Email invalid") {
                Swal.fire({
                    title: "Email is Invalid",
                    icon: "error",
                    text: "Check your email and try again."
                });
            } else if (data.error === "Mobile number invalid") {
                Swal.fire({
                    title: "Mobile Number is Invalid",
                    icon: "error",
                    text: "Check your mobile number and try again."
                });
            } else if (data.error === "Password must be at least 8 characters") {
                Swal.fire({
                    title: "Password must be at least 8 characters",
                    icon: "error",
                    text: "Check your password and try again."
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error"
                });
            }
        })
    }

    return (
        <div className="register-bg-container">
            {user.id ? <Navigate to="/" /> : null}
            <Container>
                <div className="register-inside-container">
                    <Form onSubmit={(e) => registerUser(e)}>
                        <h1 className="my-5 text-center">Register</h1>

                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                required
                                value={firstName}
                                onChange={e => { setFirstName(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                required
                                value={lastName}
                                onChange={e => { setLastName(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="mobileNo">
                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter 11 Digit No."
                                required
                                value={mobileNo}
                                onChange={e => { setMobileNo(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                required
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Show Password"
                                onChange={togglePasswordVisibility}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={e => { setConfirmPassword(e.target.value) }}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Show Confirm Password"
                                onChange={toggleConfirmPasswordVisibility}
                            />
                        </Form.Group>

                        {isActive ?
                            <Button variant="primary" type="submit">Submit</Button>
                            :
                            <Button variant="danger" type="submit" disabled>Submit</Button>
                        }
                    </Form>
                </div>
            </Container>
        </div>
    )
}
