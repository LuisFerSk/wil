import { TextField, TextFieldProps } from "@mui/material";
import { Select } from "components";

interface Props {
    children: JSX.Element[] | undefined
    fieldProps: TextFieldProps
    data: Record<any, any> | undefined
    textLoading?: string
    textNotData?: string
}

export default function AsyncSelect(props: Props) {
    const { children, data, fieldProps, textNotData, textLoading = 'Cargando...' } = props;

    function textFieldUserReturn() {
        if (!data) {
            return (
                <TextField
                    {...fieldProps}
                    value={textLoading}
                    disabled
                />
            )
        }

        if (data.length < 1) {
            return (
                <TextField
                    {...fieldProps}
                    disabled
                    value=''
                    helperText={textNotData}
                    error={true}
                />
            )
        }

        return (
            <Select
                {...fieldProps}
            >
                {children}
            </Select>
        )
    }

    return textFieldUserReturn()
}