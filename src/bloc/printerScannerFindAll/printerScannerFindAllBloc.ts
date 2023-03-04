import { IBlocEvent } from "bloc/blocUtils"
import { PrinterScannerFindResponse } from "services/models";

export class PrinterScannerFindAllBloc implements IBlocEvent { }

export class PrinterScannerFindAllBlocLoading extends PrinterScannerFindAllBloc { }

export class PrinterScannerFindAllBlocInitial extends PrinterScannerFindAllBloc { }

export class PrinterScannerFindAllBlocSuccess extends PrinterScannerFindAllBloc {
    state: PrinterScannerFindResponse[];

    constructor(state: PrinterScannerFindResponse[]) {
        super();
        this.state = state;
    }
}

export class PrinterScannerFindAllBlocFailure extends PrinterScannerFindAllBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}