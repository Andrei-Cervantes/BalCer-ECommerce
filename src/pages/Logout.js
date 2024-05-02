import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Logout() {
  
    const { unsetUser, setUser } = useContext(UserContext);

    useEffect(() => {
        Swal.fire({
            title: "Logging Out",
            icon: "success",
            text: "You are being logged out"
        });

        unsetUser();

        setUser({
            id: null,
            isAdmin: null
        });
    }, [unsetUser, setUser]);

    return (
        <Navigate to="/login" />
    );
}
