import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { Loader, Login } from "pages";
import { AuthContext } from "provider/Auth";

export default function NotAuthGuard() {
    const authContext = useContext(AuthContext)
    const { user } = authContext;

    if (user === undefined) {
        return <Loader />
    }

    if (user === null) {
        return <Login />
    }

    return <Navigate to='/' replace />
}