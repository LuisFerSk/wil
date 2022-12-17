import { useState } from 'react'
import { Alert, AlertColor, CircularProgress } from '@mui/material'
import { StateMessage } from 'interfaces'

type useMesaggeReturn = [
  StateMessage,
  (severity: AlertColor, label: string) => void,
  () => void,
  () => void,
]

export function useMessage(): useMesaggeReturn {
  const [mensaje, setMensaje] = useState<StateMessage>(null)

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
