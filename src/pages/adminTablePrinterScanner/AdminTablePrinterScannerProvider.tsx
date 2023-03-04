import AdminTablePrinterScannerPage from "./AdminTablePrinterScannerPage";
import { AdminTablePrinterScannerState } from "./context";

export default function AdminTablePrinterScannerProvider() {
    return (
        <AdminTablePrinterScannerState >
            <AdminTablePrinterScannerPage />
        </AdminTablePrinterScannerState>
    )
}