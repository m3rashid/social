export interface DemoUser {
  username: string;
  email: string;
  otp?: number;
}

export interface ForgotUser {
  username: string;
  password: string;
  confirmPassword: string;
  otp: number;
}
