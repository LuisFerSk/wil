import { roles } from "constants";
import { Support } from "pages";
import { authContext } from "provider/Auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function SupportGuard(): JSX.Element {
    const _authContext = useContext(authContext)
    const { user } = _authContext;

    if (user?.role === roles.administrator) {
        return <Support />
    }

    return <Navigate to='/404' replace />
}