import { AlertColor } from '@mui/material'
import { useState } from 'react'

type title = string | null
type content = string | JSX.Element | null

interface Props {
    initialState: boolean
    initialContent?: content
    initialTitle?: title
    initialSeverity?: AlertColor
}

export function useFloat(props: Props) {
    const { initialState = false, initialContent = null, initialTitle = null, initialSeverity = 'success' } = props;

    const [title, setTitle] = useState(initialTitle)
    const [isOpen, setItsOpen] = useState(initialState)
    const [content, setContent] = useState(initialContent)
    const [severity, setSeverity] = useState(initialSeverity)

    const open = () => setItsOpen(true)
    const close = () => setItsOpen(false)

    return { isOpen, open, close, content, setContent, title, setTitle, severity, setSeverity }
}