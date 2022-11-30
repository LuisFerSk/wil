import { useState } from 'react'
import { Alert, AlertColor, CircularProgress } from '@mui/material'
import { stateMessage } from 'interfaces'

type useMesaggeReturn = [
  stateMessage,
  (severity: AlertColor, label: string) => void,
  () => void,
  () => void,
]

export function useMessage(): useMesaggeReturn {
  const [mensaje, setMensaje] = useState<stateMessage>(null)

  function updateMensaje(severity: AlertColor, label: string) {
    setMensaje(<Alert severity={severity}>{label}</Alert>)
  }

  function resetMensaje() {
    setMensaje(null)
  }

  function mensajeLoader() {
    setMensaje(<CircularProgress color='success' />)
  }

  return [mensaje, updateMensaje, mensajeLoader, resetMensaje]
}
