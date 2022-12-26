import { EntityInterface, IdType } from "interfaces"
import { filter } from "lodash"

interface indexTabReturn {
    id: string
    'aria-controls': string
}

export function indexTab(index: number): indexTabReturn {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    }
}

export function addInArray<T>(array: T[] | [], data: T): T[] {
    return [...array, data]
}

export function deleteInArrayData<T extends EntityInterface>(array: T[], id: IdType): T[] {
    return filter(array, row => row.id !== id)
}

export function updateDataInArray<T extends EntityInterface>(array: T[], id: IdType, newData: T): T[] {
    const data = deleteInArrayData(array, id)

    return addInArray(data, newData)
}

type getDataLocalStorageReturn<T> = T | string

export function getDataLocalStorage<T>(key: string, initValue: T | string = ""): getDataLocalStorageReturn<T> {
    try {
        const item = window.localStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
        return initValue;
    } catch (e) {
        console.error(e)
        return initValue;
    }
}

export function setDataLocalStorage(key: string, data: any): boolean {
    try {
        window.localStorage.setItem(key, data)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export function serializeToken(token: string): string {
    return token.replace(/["']/g, '')
}

