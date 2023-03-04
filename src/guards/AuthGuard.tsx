import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { Home, Loader } from "pages";
import { AuthContext } from "provider/Auth";

export default function AuthGuard() {
    const authContext = useContext(AuthContext)
    const { user } = authContext;

    if (user === undefined) {
        return <Loader />
    }

    if (user === null) {
        return <Navigate to='/login' replace />
    }

    return <Home />
}