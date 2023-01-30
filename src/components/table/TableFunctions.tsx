import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { GetComparatorOrderType, TableOptionsInterface } from 'interfaces'

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

interface DescendingComparatorInterface {
    a: Record<any, any>,
    b: Record<any, any>,
    orderBy: string
}

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

export function getComparator(order: GetComparatorOrderType, orderBy: string) {
    if (order === 'desc') {
        return (a: Record<string, any>, b: Record<string, any>) => descendingComparator({ a, b, orderBy })
    }

    return (a: Record<string, any>, b: Record<string, any>) => -descendingComparator({ a, b, orderBy })
}

interface ApplySortFilterInterface {
    array: Record<string, any>[]
    comparator: (a: Record<string, any>, b: Record<string, any>) => number
    query: string
    searchBy: string
    searchByOther?: string
}

export function applySortFilter(props: ApplySortFilterInterface) {
    const { array, comparator, query, searchBy, searchByOther } = props;

    const stabilizedThis = array.map((element, index) => [element, index] as [Record<string, any>, number])

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])

        if (order !== 0) return order;

        return a[1] - b[1]
    })

    if (query) {
        return filter(array, (header) => {
            if (header[searchBy] && searchByOther && header[searchByOther]) {
                return header[searchByOther].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1 || header[searchBy].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
            }

            if (header[searchBy]) {
                return header[searchBy].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
            }

            if (searchByOther && header[searchByOther]) {
                return header[searchByOther].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
            }

            return -1
        })
    }

    return stabilizedThis.map((element) => element[0])
}
