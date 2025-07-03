import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const auth = getToken();
        console.log(auth);

        if (!auth) {
            navigate('/unauthorised');
        } else {
            const { token, role } = auth;
            setToken(token);
            setRole(role);

            if (role !== 'admin') {
                navigate('/unauthorised');
            }
        }
    }, [navigate]);

    return token && role === 'admin' ? <>{children}</> : null;
};

export default Auth;
