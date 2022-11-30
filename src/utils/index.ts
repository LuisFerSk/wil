export function indexTab(index: number) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    }
}

export function isObject(value: any) {
    return typeof value === 'object'
}

export function isBoolean(value: any) {
    return typeof value === 'boolean'
}

export function isString(value: any) {
    return typeof value === 'string'
}

export function addInArray<T>(array: T[] | [], data: T) {
    return [...array, data]
}

export function getDataLocalStorage(key: string, initValue?: any) {
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

export function setDataLocalStorage(key: string, data: any) {
    try {
        window.localStorage.setItem(key, data)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export function serializarToken(token: string) {
    return token.replace(/["']/g, '')
}

