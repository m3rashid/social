// types for the redux payloads

export interface ActionType {
  type: string;
  payload?: any;
}

export interface LoginUserType {
  username: string;
  password: string;
}

export interface RegisterOneUserType {
  username: string;
  email: string;
}

export interface RegisterTwoUserType {
  username: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  otp: number;
}

export interface ResetPasswordType {
  username: string;
  password: string;
  confirmPassword: string;
  otp: number;
}
