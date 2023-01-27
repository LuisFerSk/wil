import { TextField, TextFieldProps } from "@mui/material";
import { Select } from "components";
import { AnyObject } from "interfaces";

interface AsyncSelectProps {
    children: JSX.Element[] | undefined
    fieldProps: TextFieldProps
    data: AnyObject[] | undefined
    textLoading?: string
    textNotData?: string
}

export default function AsyncSelect(props: AsyncSelectProps): JSX.Element {
    const { children, data, fieldProps, textNotData, textLoading = 'Cargando...' } = props;

    function textFieldUserReturn(): JSX.Element {
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