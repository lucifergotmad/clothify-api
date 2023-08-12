import { Module } from "@nestjs/common";
import { MemberRepositoryModule } from "./database/member.repository.module";
import { MemberUseCaseModule } from "./use-cases/member.use-case.module";
import { MemberController } from "./controller/member.controller";

@Module({
  imports: [MemberUseCaseModule, MemberRepositoryModule],
  controllers: [MemberController],
})
export class MemberModule {}
