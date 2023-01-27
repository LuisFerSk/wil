import { visuallyHidden } from '@mui/utils'
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material'
import { GetComparatorOrderType, HeadLabelInterface } from 'interfaces'

interface TableListHeadProps {
    order: GetComparatorOrderType
    orderBy: string
    headLabel: HeadLabelInterface[]
    onRequestSort: (event: any, property: string) => void
}

export default function TableListHead(props: TableListHeadProps) {
    const { order, orderBy, headLabel, onRequestSort, } = props
    const createSortHandler = (property: string) => (event: any) => {
        onRequestSort(event, property)
    }

    const getOrderTextBox = () => {
        return order === 'desc' ? 'sorted descending' : 'sorted ascending'
    }

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell: HeadLabelInterface) => (
                    <TableCell padding={headCell.padding}
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box sx={{ ...visuallyHidden }}>
                                    {getOrderTextBox()}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}