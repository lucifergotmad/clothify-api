import { Provider } from "@nestjs/common";
import { DeleteUser } from "./delete-user.use-case";
import { FindUserById } from "./find-user-by-id.use-case";
import { UpdateUser } from "./update-user.use-case";
import { RegisterUser } from "./register-user.use-case";

export const userUseCaseProvider: Provider[] = [
  RegisterUser,
  FindUserById,
  DeleteUser,
  UpdateUser,
];
