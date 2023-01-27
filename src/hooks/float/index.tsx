import { useState } from 'react'

type title = string | null
type content = string | JSX.Element | null
type severity = 'success' | 'error' | 'warning' | 'info'

interface useFloatProps {
    initialState: boolean
    initialContent?: content
    initialTitle?: title
    initialSeverity?: severity
}

export function useFloat(props: useFloatProps) {
    const { initialState = false, initialContent = null, initialTitle = null, initialSeverity = 'success' } = props;

    const [title, setTitle] = useState<title>(initialTitle)
    const [isOpen, setItsOpen] = useState<boolean>(initialState)
    const [content, setContent] = useState<content>(initialContent)
    const [severity, setSeverity] = useState<severity>(initialSeverity)

    const open = () => setItsOpen(true)
    const close = () => setItsOpen(false)

    return { isOpen, open, close, content, setContent, title, setTitle, severity, setSeverity }
}