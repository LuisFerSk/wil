import { filter } from 'lodash'
import { Icon, IconifyIcon } from '@iconify/react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { GetComparatorOrderType } from 'interfaces'

interface TableOptionsInterface {
    label: string
    icon: IconifyIcon | string
    onClick: React.MouseEventHandler<HTMLAnchorElement>
}

export function mappingMenuItem(options: TableOptionsInterface[]) {
    return (
        <span>
            {options.map((row, index) => {
                const { label, icon, onClick } = row;
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

interface DescendingComparatorInterface<T extends Record<string, any>> {
    a: T,
    b: T,
    orderBy: keyof T
}

export function descendingComparator<T extends Record<string, any>>(props: DescendingComparatorInterface<T>): descendingComparatorReturn {
    const { a, b, orderBy } = props

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

export function getComparator<T extends Record<string, any>>(order: GetComparatorOrderType, orderBy: keyof T) {
    if (order === 'desc') {
        return (a: T, b: T) => descendingComparator({ a, b, orderBy })
    }

    return (a: T, b: T) => -descendingComparator({ a, b, orderBy })
}

interface ApplySortFilterInterface<T extends Record<string, any>> {
    array: T[]
    comparator: (a: T, b: T) => number
    query: string
    searchBy: keyof T
}

export function applySortFilter<T extends Record<string, any>>(props: ApplySortFilterInterface<T>) {
    const { array, comparator, query, searchBy } = props;

    const stabilizedThis = array.map((element, index) => [element, index] as [T, number])

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])

        if (order !== 0) return order;

        return a[1] - b[1]
    })

    if (query) {
        return filter(array, (header) => header[searchBy].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }

    return stabilizedThis.map((element) => element[0])
}
