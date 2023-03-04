import { MaintenanceState } from "./context";
import MaintenancePage from "./MaintenancePage";

export default function MaintenanceProvider() {
    return (
        <MaintenanceState >
            <MaintenancePage />
        </MaintenanceState>
    )
}