import { useContext } from "react";
import { useFormik } from "formik";

import { FormPrinterScanner } from "components";
import { useMessage } from "hooks";
import { AuthContext } from "provider/Auth";
import { printerScannerSchema, } from "schemas";
import { PrinterScannerCreateRequest, PrinterScannerFindResponse, PrinterScannerUpdateRequest } from "services/models";
import { printerScannerUpdate } from "services/printer_scanner";

interface Props {
    initData: PrinterScannerFindResponse
}

export default function FormUpdatePrinterScanner(props: Props) {
    const { initData } = props;

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: new PrinterScannerCreateRequest({ ...initData, brand: initData.brand.name }),
        validationSchema: printerScannerSchema,
        onSubmit: (data) => {
            messageLoader()

            printerScannerUpdate(token, new PrinterScannerUpdateRequest({ ...data, id: initData.id }))
                .then(() => {
                    setMessage("success", 'Se ha actualizado correctamente la impresora o scanner.')
                })
                .catch(({ response }) => {
                    setMessage('error', response.data)
                })
        },
    })

    return (
        <FormPrinterScanner formik={formik} message={message} />
    )
}