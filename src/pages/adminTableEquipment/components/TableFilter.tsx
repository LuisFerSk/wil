import { useState, useEffect } from 'react'
import { Button, Card, Grid, Typography } from "@mui/material";
import { Accordion } from "components";

interface ValuesInterface<T extends Record<string, any>> {
    label: string,
    value: T[keyof T][]
}

interface FilterInterface<T extends Record<string, any>> {
    id: keyof T
    label: string
    values: ValuesInterface<T>[]
}

interface Props<T extends Record<string, any>> {
    title: string
    icon: JSX.Element
    initialFilters: FilterInterface<T>[]
    onChange: (filters: FilterInterface<T>[]) => void
}

export default function TableFilter<T extends Record<string, any>>(props: Props<T>) {
    const { title, icon, initialFilters, onChange } = props;

    const [filters, setFilters] = useState<FilterInterface<T>[]>(initialFilters)

    function handledChangeFilters(id: keyof T, value: ValuesInterface<T>) {
        const found = filters.find((item) => item.values.includes(value))

        if (!found) {
            const newFilter = filters.map((item) => {
                if (item.id === id) {
                    item.values = [...item.values, value]
                }

                return item;
            })

            setFilters(newFilter)
            return;
        }

        const newFilter = filters.map((item) => {
            const { values } = item

            const indexValue = values.indexOf(value)

            if (indexValue >= 0) {
                values.splice(indexValue, 1)
            }

            return item;
        })

        setFilters(newFilter)
    }

    const Accordions = [
        {
            title,
            icon,
            content: (
                <Grid container spacing={2}>
                    <Grid item md={12} container spacing={2}>
                        <Grid item md={6} >
                            <Button
                                fullWidth
                                color='inherit'
                                variant='outlined'
                                onClick={() => {
                                    setFilters(initialFilters)
                                }}
                            >
                                Seleccionar todos
                            </Button>
                        </Grid>
                        <Grid item md={6} >
                            <Button
                                fullWidth
                                color='inherit'
                                variant='outlined'
                                onClick={() => {
                                    const newFilters = filters.map((item) => {
                                        item.values = []
                                        return item;
                                    })

                                    setFilters(newFilters)
                                }}
                            >
                                Limpiar filtros
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        {filters.map((item) => (
                            <>
                                <Grid item md={12}>
                                    <Typography variant='body2' >{item.label}</Typography>
                                </Grid>
                                <Grid item md={12} container spacing={2}>
                                    {item.values.map((options) => {
                                        let gridSize = 12 / item.values.length;

                                        if (gridSize % 1 !== 0) {
                                            gridSize += 1;
                                        }

                                        return (
                                            <Grid item xs={12} md={gridSize} >
                                                <Button
                                                    fullWidth
                                                    variant={filters.find((item) => item.values.includes(options)) ? 'contained' : 'outlined'}
                                                    onClick={() => {
                                                        handledChangeFilters(item.id, options)
                                                    }}
                                                >
                                                    {options.label}
                                                </Button>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Grid >
            )
        }
    ]

    useEffect(() => {
        onChange(filters)
    }, [filters])

    return (
        <Card sx={{ marginBottom: 3 }}>
            <Accordion accordions={Accordions} />
        </Card>
    )
}