import { TextField, TextFieldProps } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

export default function Select(props: TextFieldProps) {
    return (
        <TextField
            select
            SelectProps={{
                MenuProps,
            }}
            {...props}
        />
    )
}