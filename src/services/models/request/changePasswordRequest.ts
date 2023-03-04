export class ChangePasswordRequest {
    id: number
    password: string

    constructor(props: Partial<ChangePasswordRequest> = {}) {
        this.id = props.id || NaN
        this.password = props.password || ''
    }
}