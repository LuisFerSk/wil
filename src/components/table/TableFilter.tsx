import { useState, useEffect, useId } from 'react'
import { Button, Card, Grid, Typography } from "@mui/material";
import { Accordion } from "components";

interface ValuesInterface<T extends Record<string, any>> {
    label: string,
    value: T[keyof T]
}

export interface FilterInterface<T extends Record<string, any>> {
    id: keyof T
    label: string
    values: T[keyof T][]
    filterOptions: ValuesInterface<T>[]
}

interface Props<T extends Record<string, any>> {
    title: string
    icon: JSX.Element
    filters: FilterInterface<T>[]
    onChange: (filters: FilterInterface<T>[]) => void
    maxColumn?: number
}

export default function TableFilter<T extends Record<string, any>>(props: Props<T>) {
    const { title, icon, onChange, maxColumn } = props;

    const [filters, setFilters] = useState<FilterInterface<T>[]>(props.filters)

    function handledChangeFilters(id: keyof T, value: T[keyof T]) {
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
                                    const newFilters = filters.map((item) => {
                                        item.values = item.filterOptions.map((item) => item.value)
                                        return item;
                                    })

                                    setFilters(newFilters)
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
                    {filters.map((filter, key) => (
                        <Grid item md={6} xs={12} key={`${useId()}-${key}`}>
                            <Grid item xs={12}>
                                <Typography variant='body2' >{filter.label}</Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={2}>
                                {filter.filterOptions.map((options, key) => {
                                    const numberColumns = maxColumn === undefined || filter.filterOptions.length < maxColumn ? filter.filterOptions.length : maxColumn;

                                    let gridSize = 12 / numberColumns;

                                    if (gridSize % 1 !== 0) {
                                        gridSize = Math.trunc(gridSize) + 1;
                                    }

                                    return (
                                        <Grid item xs={12} md={gridSize} key={`${useId()}-${key}`}>
                                            <Button
                                                fullWidth
                                                variant={filters.find((item) => item.values.includes(options.value)) ? 'contained' : 'outlined'}
                                                onClick={() => {
                                                    handledChangeFilters(filter.id, options.value)
                                                }}
                                            >
                                                {options.label}
                                            </Button>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    ))}
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