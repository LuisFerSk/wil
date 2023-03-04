import AdminTableEquipmentPage from "./AdminTableEquipmentPage";
import { AdminTableState } from "./context";

export default function AdminTableEquipmentProvider() {
    return (
        <AdminTableState >
            <AdminTableEquipmentPage />
        </AdminTableState>
    )
}