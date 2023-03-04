export class SignInRequest {
    username: string;
    password: string;

    constructor(props: Partial<SignInRequest> = {}) {
        this.username = props.username || '';
        this.password = props.password || '';
    }
}
