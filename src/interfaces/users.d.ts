export interface PropsUsers {
  user_id?: number;
  name: string;
  email: string;
  password: string;
  rule: string;
}

export interface PropsUserLogin {
  email: string;
  password: string;
}
