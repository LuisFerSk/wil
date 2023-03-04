export class SupportCreateRequest {
    username: string;
    password: string;

    constructor(props: Partial<SupportCreateRequest> = {}) {
        this.username = props.username || ''
        this.password = props.password || ''
    }
}
