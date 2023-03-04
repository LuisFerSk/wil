import { IBlocEvent } from "bloc/blocUtils"
import { PrinterScannerFindResponse } from "services/models";

export class PrinterScannerFindBloc implements IBlocEvent { }

export class PrinterScannerFindBlocLoading extends PrinterScannerFindBloc { }

export class PrinterScannerFindBlocInitial extends PrinterScannerFindBloc { }

export class PrinterScannerFindBlocSuccess extends PrinterScannerFindBloc {
    state: PrinterScannerFindResponse;

    constructor(state: PrinterScannerFindResponse) {
        super();
        this.state = state;
    }
}

export class PrinterScannerFindBlocFailure extends PrinterScannerFindBloc {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}