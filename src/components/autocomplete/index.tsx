import { Autocomplete as AutocompleteMaterial, AutocompleteRenderInputParams, createFilterOptions, TextField } from "@mui/material";
import { FieldInputProps } from "formik";

interface AutocompleteProps extends FieldInputProps<any> {
    handledChangeState: (value: string | null) => void
    options: string[]
}

const filter = createFilterOptions<string>();

export default function Autocomplete(props: AutocompleteProps): JSX.Element {
    const { onChange, handledChangeState, options } = props;


    return (
        <AutocompleteMaterial
            fullWidth
            freeSolo
            {...props}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options}
            renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label="marca" />}
        />
    )
}