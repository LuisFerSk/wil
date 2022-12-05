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

export function isObject(value: any): boolean {
    return typeof value === 'object'
}

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean'
}

export function isString(value: any): boolean {
    return typeof value === 'string'
}

export function addInArray<T>(array: T[] | [], data: T): T[] {
    return [...array, data]
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

export function serializarToken(token: string): string {
    return token.replace(/["']/g, '')
}

