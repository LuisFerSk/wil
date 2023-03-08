import { useState, useId } from 'react'

import {
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Table as MaterialTable,
    Card,
    MenuItem,
} from '@mui/material'

import Scrollbar from '../scrollbar/Scrollbar'
import SearchNotFound from '../searchNotFound/SearchNotFound'
import TableListHead from './TableListHead'
import TableListToolbar from './TableListToolbar'
import { getComparator, applySortFilter } from './TableFunctions'
import { GetComparatorOrderType, HeadLabelInterface, SelectItemInterface } from 'interfaces'
import { Select } from 'components'

interface Props<T extends Record<string, any>> {
    id?: string
    createTableCells: (row: T) => JSX.Element
    headLabel: HeadLabelInterface<T>[]
    data: T[]
    selectBy: keyof T
    searchBy: keyof T
    optionsSearchBy?: SelectItemInterface<T>[]
    placeholder?: string
}

export default function Table<T extends Record<string, any>>(props: Props<T>) {
    const { headLabel, data, selectBy, createTableCells, searchBy, placeholder, optionsSearchBy } = props

    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [order, setOrder] = useState<GetComparatorOrderType>('asc')
    const [orderBy, setOrderBy] = useState(selectBy)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [selectedSearchBy, setSelectedSearchBy] = useState(searchBy)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const comparator = getComparator(order, orderBy);

    const filtered = applySortFilter({
        array: data,
        comparator,
        query: filter,
        searchBy: selectedSearchBy
    })

    return (
        <Card>
            <TableListToolbar
                filter={filter}
                placeholder={placeholder}
                onFilter={(props) => { setFilter(props.target.value) }}
            >
                {optionsSearchBy ?
                    <Select
                        fullWidth
                        label="Buscar por"
                        variant="outlined"
                        value={selectedSearchBy}
                        onChange={(event) => {
                            setSelectedSearchBy(event.target.value)
                        }}
                    >
                        {optionsSearchBy.map((item, key) =>
                            <MenuItem key={`${useId()}-${key}`} value={item.id as string}>
                                {item.label as string}
                            </MenuItem>
                        )}
                    </Select>
                    : null
                }
            </TableListToolbar>
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <MaterialTable>
                        <TableListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={headLabel}
                            onRequestSort={(event, property) => {
                                const isAsc = orderBy === property && order === 'asc'
                                setOrder(isAsc ? 'desc' : 'asc')
                                setOrderBy(property)
                            }}
                        />
                        <TableBody>
                            {filtered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) =>
                                    <TableRow
                                        hover
                                        key={index}
                                        tabIndex={-1}
                                        role='checkbox'
                                    >
                                        {createTableCells(row)}
                                    </TableRow>
                                )
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        {filtered.length === 0 && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filter} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </MaterialTable>
                </TableContainer>
            </Scrollbar>
            <TablePagination
                page={page}
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage={"Filas por página:"}
                labelDisplayedRows={({ from, to, count }) => {
                    return `${from}-${to} de ${count}`
                }}
                onRowsPerPageChange={({ target }) => {
                    setRowsPerPage(parseInt(target.value, 10))
                    setPage(0)
                }}
                onPageChange={(event, newPage) => {
                    setPage(newPage)
                }}
            />
        </Card>
    )
}