import { SupportState } from "./context";
import SupportPage from "./SupportPage";

export default function SupportProvider() {
    return (
        <SupportState >
            <SupportPage />
        </SupportState>
    )
}