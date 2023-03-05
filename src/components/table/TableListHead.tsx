import { visuallyHidden } from '@mui/utils'
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material'
import { GetComparatorOrderType, HeadLabelInterface } from 'interfaces'

type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>

interface Props<T extends Record<string, any>> {
    order: GetComparatorOrderType
    orderBy: keyof T
    headLabel: HeadLabelInterface<T>[]
    onRequestSort: (event: MouseEventType, property: keyof T) => void
}

export default function TableListHead<T extends Record<string, any>>(props: Props<T>) {
    const { order, orderBy, headLabel, onRequestSort, } = props;

    function createSortHandler(property: keyof T) {
        return (event: MouseEventType) => { onRequestSort(event, property) }
    }

    function getOrderTextBox() {
        return order === 'desc' ? 'sorted descending' : 'sorted ascending'
    }

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell padding={headCell.padding}
                        key={headCell.id as string}
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