import { createContext } from 'react'

import { PrinterScannerFindAllBloc, PrinterScannerFindAllBlocLoading } from 'bloc'

interface ContextProps {
    bloc: PrinterScannerFindAllBloc
    setBloc?: React.Dispatch<React.SetStateAction<PrinterScannerFindAllBloc>>
    setTitleModal?: React.Dispatch<React.SetStateAction<string | null>>
    setContentModal?: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>
    openModal?: VoidFunction
    closeModal?: VoidFunction
    openAlert?: VoidFunction
    getPrinterScanner?: VoidFunction
}

export const AdminTablePrinterScannerContext = createContext<ContextProps>({
    bloc: new PrinterScannerFindAllBlocLoading(),
})