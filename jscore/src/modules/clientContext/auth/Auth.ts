export default abstract class Auth<T> { 

    protected tokens: T;

    public abstract checkLocalAuth(): Promise<boolean>
    public abstract signIn(email: string, password: string): Promise<void>
    public abstract signUp(email: string, password: string): Promise<void>
    public abstract signOut(): Promise<void>

}