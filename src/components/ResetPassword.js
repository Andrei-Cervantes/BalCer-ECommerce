import { useState } from "react";

export default function ResetPassword() {

    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ message, setMessage ] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ password: password })
            });

            if (response.ok) {
                setMessage('Password updated successfully');
                setPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    }
    return (
        <div className="container px-5 mx-5">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    New Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                </div>
                {message && <div className="alert alert-danger">{message}</div>}
                <button type="submit" className="btn btn-primary">
                Reset Password
                </button>
            </form>
        </div>
    );
}