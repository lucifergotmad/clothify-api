import { Provider } from "@nestjs/common";
import { RegisterMember } from "./register-member.use-case";
import { AddMemberAddress } from "./add-member-address.use-case";
import { UpdateMemberAddress } from "./update-member-address.use-case";
import { GetMemberAddress } from "./get-member-address.use-case";

export const memberUseCaseProvider: Provider[] = [
  RegisterMember,
  AddMemberAddress,
  UpdateMemberAddress,
  GetMemberAddress,
];
