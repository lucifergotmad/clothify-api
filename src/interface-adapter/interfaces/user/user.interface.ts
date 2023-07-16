import { IId } from "../id.interface";

export interface IUserResponse extends IId {
  fullname: string;
  username: string;
  level: string;
}
