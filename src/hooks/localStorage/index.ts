import { useState } from 'react'
import { getDataLocalStorage, setDataLocalStorage } from 'utils'

export function useLocalStorage(key: string, initValue?: string): [string, (value: any) => void, (key: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(getDataLocalStorage(key, initValue))

  function setValue(value: string) {
    const data = JSON.stringify(value)

    if (setDataLocalStorage(key, data)) {
      setStoredValue(data)
    }
  }

  function removeItem(key: string) {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {
      console.error(e)
    }
  }

  return [storedValue, setValue, removeItem]
}
