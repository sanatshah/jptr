import { AuthenticationState } from "../../../../constants/Authentication";
import Auth from "../Auth";

interface MatrixTokens {
    accessToken: string;
    device_id: string;
    home_server: string;
    user_id: string;
}

export default class Matrix extends Auth<MatrixTokens> {
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;

    constructor(
        private updateAuthState,
        protected cognitoConfig,
        private matrix
    ) {
        super();
    }

    public async checkLocalAuth(){
        console.log("checkign local auth!!")
        try {
            const accessToken = await this.matrix.client.getAccessToken()
            if (accessToken) {
                this.updateAuthState(AuthenticationState.SUCCESS);
                return true;
            }
        } catch (e) {
            this.updateAuthState(AuthenticationState.ERROR);
        }
        this.updateAuthState(AuthenticationState.UNKNOWN);
        return false;
    }

    public async signIn(username: string, password: string) {
        try {
            const response = await this.matrix.client.login(
                "m.login.password", 
                    {
                        "user": username,
                        "password": password
                    }
                );

            this.tokens = response;
            window.localStorage.setItem("matrix", JSON.stringify(this.tokens));
            this.updateAuthState(AuthenticationState.SUCCESS);
        } catch (e) {
            this.updateAuthState(AuthenticationState.ERROR);
        }
    }

    public async signUp(email: string, password: string) {
       
    }

    public async confirmSignUp(email: string, confirmationCode: string) {
       
    }

    public async resendSignUpConfirmation(username: string) {
       
    }

    public async signOut() {
       
    }

}