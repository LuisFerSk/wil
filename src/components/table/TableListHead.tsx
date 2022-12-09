import { visuallyHidden } from '@mui/utils'
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material'

interface headLabelInterface {
    id: string,
    label: string,
    alignRight?: boolean,
    padding?: "checkbox" | "none" | "normal",
}

const TableListHead = (props: any) => {
    const { order, orderBy, headLabel, onRequestSort, } = props
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property)
    }

    const getOrderTextBox = () => {
        return order === 'desc' ? 'sorted descending' : 'sorted ascending'
    }

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell: headLabelInterface) => (
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

export default TableListHead;