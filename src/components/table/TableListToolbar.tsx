import { ChangeEvent } from 'react'
import { Icon } from '@iconify/react'
import searchFill from '@iconify/icons-eva/search-fill'
import { styled } from '@mui/material/styles'
import { Box, Toolbar, OutlinedInput, InputAdornment, Grid } from '@mui/material'

interface Props {
    filter: string
    onFilter: (event: ChangeEvent<HTMLInputElement>) => void
    type?: string
    placeholder?: string
    children: JSX.Element | null
}

export default function TableListToolbar(props: Props) {
    const { filter, onFilter, type = 'text', placeholder = 'Buscar', children } = props;

    return (
        <Grid container padding={3} spacing={3} justifyContent='space-between' display='flex'>
            <Grid item xs={12} md={8}>
                <OutlinedInput
                    fullWidth
                    type={type}
                    value={filter}
                    onChange={onFilter}
                    placeholder={placeholder}
                    startAdornment={
                        <InputAdornment position='start'>
                            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item xs={12} md={4}>
                {children}
            </Grid>
        </Grid>
    )
}