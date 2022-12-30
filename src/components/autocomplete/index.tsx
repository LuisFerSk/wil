import { Autocomplete as AutocompleteMaterial, AutocompleteRenderInputParams, createFilterOptions, TextField, TextFieldProps } from "@mui/material";
import { FormikErrors } from "formik";

interface AutocompleteProps<T> {
    options: string[]
    textFieldProps: TextFieldProps
    fieldValue: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<T>> | Promise<void>
}

export interface valueProps {
    title: string
    inputValue?: string
}

const filter = createFilterOptions<valueProps>();

export default function Autocomplete<T>(props: AutocompleteProps<T>): JSX.Element {
    const { options, fieldValue, setFieldValue, textFieldProps } = props;
    const { name = '' } = textFieldProps;

    return (
        <AutocompleteMaterial
            handleHomeEndKeys
            selectOnFocus
            clearOnBlur
            freeSolo
            value={{ title: fieldValue }}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setFieldValue(name, newValue)
                    return;
                }

                if (newValue && newValue.inputValue) {
                    setFieldValue(name, newValue.inputValue)
                    return;
                }

                setFieldValue(name, newValue?.title)

            }}
            options={options.map(row => ({ title: row } as valueProps))}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }

                if (option.inputValue) {
                    return option.inputValue;
                }

                return option.title;
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params)

                const { inputValue } = params;

                const isExisting = options.some((option) => inputValue === option.title)

                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} {...textFieldProps} value={fieldValue} />}
        />
    )
}