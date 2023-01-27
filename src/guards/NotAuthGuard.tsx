import { Loader, Login } from "pages";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function NotAuthGuard() {
    const _authContext = useContext(authContext)
    const { user } = _authContext;

    if (user === undefined) {
        return <Loader />
    }

    if (user === null) {
        return <Login />
    }

    return <Navigate to='/' replace />
}