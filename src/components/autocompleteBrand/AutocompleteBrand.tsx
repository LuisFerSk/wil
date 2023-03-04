import { TextField } from '@mui/material';

import { Autocomplete } from "components";
import { AutoCompleteProps } from "components/autocomplete/Autocomplete";
import { BrandFindAllBloc, BrandFindAllBlocLoading, BrandFindAllBlocSuccess } from 'bloc';

interface Props<T> extends Omit<AutoCompleteProps<T>, 'options'> {
    brandBloc: BrandFindAllBloc
}

export default function AutocompleteBrand<T>(props: Props<T>) {
    const { brandBloc } = props;

    if (brandBloc instanceof BrandFindAllBlocSuccess) {
        return (
            <Autocomplete {...props} options={brandBloc.state.map(brand => brand.name)} />
        )
    }

    if (brandBloc instanceof BrandFindAllBlocLoading) {
        return (
            <TextField
                fullWidth
                label="Marca"
                variant="outlined"
                disabled={true}
                helperText='Cargando...'
            />
        )
    }

    return (
        <TextField
            fullWidth
            label="Marca"
            variant="outlined"
            disabled={true}
            helperText='No se ha podido cargar las marcas'
            error={true}

        />
    )

}