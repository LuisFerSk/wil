import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import {
    DataTableType,
    DescendingComparatorInterface,
    GetComparatorOrderType,
    StabilizedSortType,
    TableOptionsInterface
} from 'interfaces'

export function mappingMenuItem(options: TableOptionsInterface[]) {
    return (
        <span>
            {options.map((row, index) => {
                const { label, icon, onClick } = row
                return (
                    <MenuItem
                        href='#'
                        key={index}
                        onClick={onClick}
                        sx={{ color: 'text.secondary' }}
                    >
                        <ListItemIcon>
                            <Icon icon={icon} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary={label} primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                )
            })}
        </span>
    )
}

type descendingComparatorReturn = 1 | -1 | 0;

export function descendingComparator(props: DescendingComparatorInterface): descendingComparatorReturn {
    const { a, b, orderBy } = props

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

type getComparatorReturn<T> = (a: T, b: T) => number;

export function getComparator<T>(order: GetComparatorOrderType, orderBy: string): getComparatorReturn<T> {
    if (order === 'desc') {
        return (a: T, b: T) => descendingComparator({
            a: a as Record<any, any>,
            b: b as Record<any, any>,
            orderBy
        })
    }
    return (a: T, b: T) => -descendingComparator({
        a: a as Record<any, any>,
        b: b as Record<any, any>, 
        orderBy
    })
}

interface ApplySortFilterInterface<T> {
    array: DataTableType<T>
    comparator: (a: T, b: T) => number
    query: string
    searchBy: string
}

export function applySortFilter<T>(props: ApplySortFilterInterface<T>): any[] {
    const { array, comparator, query, searchBy } = props

    const stabilizedThis: StabilizedSortType<T>[] = array.map((element, index) => [element, index])

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])

        if (order !== 0) return order;

        return a[1] - b[1]
    })

    if (query) {
        return filter(array, (header: Record<any, any>) => header[searchBy].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }

    return stabilizedThis.map((element: any) => element[0])
}
