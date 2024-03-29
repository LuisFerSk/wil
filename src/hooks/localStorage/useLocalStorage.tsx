import { useState } from 'react'
import { getDataLocalStorage, setDataLocalStorage } from 'utils'

type useLocalStorageReturn = [
  string,
  (value: string) => void,
  (key: string) => void
]

export default function useLocalStorage(key: string, initValue: string = ""): useLocalStorageReturn {
  const [storedValue, setStoredValue] = useState(getDataLocalStorage(key, initValue))

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
