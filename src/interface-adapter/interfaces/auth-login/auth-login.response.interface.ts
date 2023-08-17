interface IAuthLoginMemberResponse {
  fullname?: string;
  email?: string;
  phone_number?: string;
}

export interface IAuthLoginResponse extends IAuthLoginMemberResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  level?: string;
}
