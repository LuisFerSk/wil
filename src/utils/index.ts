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

export function addIfNotExist<T>(array: T[], data: T): T[] {
    if (array.includes(data)) {
        return array;
    }
    return addInArray(array, data)
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

export function formatDateApi(date: string): string {
    const dateFormat = new Date(date)

    dateFormat.setDate(dateFormat.getDate() + 1)
    dateFormat.setHours(0, 0, 0, 0)

    return dateFormat.toLocaleDateString()
}

export function dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',')

    const arrReg = arr[0].match(/:(.*?);/)

    const mime = arrReg ? arrReg[1] : undefined

    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

export function blobToDataURL(blob: Blob, callback: (result?: string | ArrayBuffer | null) => void) {
    const a = new FileReader()

    a.onload = (event) => {
        callback(event.target?.result)
    }

    a.readAsDataURL(blob)
}