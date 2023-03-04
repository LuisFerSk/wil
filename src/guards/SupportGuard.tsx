import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "provider/Auth";
import { ROLES } from "constants";

interface Props {
    adminElement: JSX.Element,
    supportElement: JSX.Element
}

export default function SupportGuard(props: Props) {
    const { adminElement, supportElement } = props;

    const authContext = useContext(AuthContext)
    const { user } = authContext;

    if (user?.role === ROLES.administrator) {
        return adminElement;
    }

    if (user?.role === ROLES.support) {
        return supportElement;
    }

    return <Navigate to='/404' replace />
}