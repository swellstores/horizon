export enum NOTIFICATION_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface Notification {
  id: string;
  type?: NOTIFICATION_TYPE;
  message: string;
  timeout?: number;
}
