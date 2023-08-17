import { Module } from "@nestjs/common";
import { MemberRepositoryModule } from "../database/member.repository.module";
import { memberUseCaseProvider } from "./member.use-case.provider";
import { MemberAddressRepositoryModule } from "src/modules/member-address/database/member-address.repository.module";

@Module({
  imports: [MemberRepositoryModule, MemberAddressRepositoryModule],
  exports: memberUseCaseProvider,
  providers: memberUseCaseProvider,
})
export class MemberUseCaseModule {}
