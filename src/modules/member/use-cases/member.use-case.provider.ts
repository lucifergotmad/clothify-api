import { Provider } from "@nestjs/common";
import { RegisterMember } from "./register-member.use-case";

export const memberUseCaseProvider: Provider[] = [RegisterMember];
