import { useContext } from "react";
import { useFormik } from "formik";

import { FormEquipment } from "components";
import { useMessage } from "hooks";
import { AuthContext } from "provider/Auth";
import { equipmentSchema, } from "schemas";
import { equipmentUpdate } from "services/equipment";
import { EquipmentCreateRequest, EquipmentFindResponse, EquipmentUpdateRequest } from "services/models";

interface Props {
    initData: EquipmentFindResponse
}

export default function FormUpdateEquipment(props: Props) {
    const { initData } = props;

    const authContext = useContext(AuthContext)
    const { token } = authContext;

    const [message, setMessage, messageLoader] = useMessage()

    const formik = useFormik({
        initialValues: new EquipmentCreateRequest({ ...initData, brand: initData.brand.name }),
        validationSchema: equipmentSchema,
        onSubmit: (data) => {
            messageLoader()

            equipmentUpdate(token, new EquipmentUpdateRequest({ ...data, id: initData.id }))
                .then(() => {
                    setMessage("success", 'Se ha actualizado correctamente el equipo.')
                })
                .catch(({ response }) => {
                    setMessage('error', response.data)
                })
        },
    })

    return (
        <FormEquipment formik={formik} message={message} />
    )
}