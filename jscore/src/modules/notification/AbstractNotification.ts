
export interface NotificationEvent {

}

export default abstract class NotificationInterface {
  protected hasPermission : boolean;
  protected listeners : ((data) => void)[];

  protected abstract checkPermission(): Promise<boolean>;
  protected abstract requestPermission(): void;
  protected abstract updateToken(): void;
  public abstract addEventListener(data): void
  protected abstract newNotification(data): void;

}