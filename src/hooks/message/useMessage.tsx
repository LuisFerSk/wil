import { useState } from 'react'
import { Alert, AlertColor, CircularProgress } from '@mui/material'
import { StateMessage } from 'interfaces'

type useMessageReturn = [
  StateMessage,
  (severity: AlertColor, label: string) => void,
  Function,
  Function,
]

export default function useMessage(): useMessageReturn {
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
