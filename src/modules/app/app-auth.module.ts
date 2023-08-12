import { Module } from "@nestjs/common";
import { AuthModule } from "src/infra/auth/auth.module";
import { UserUseCaseModule } from "../user/use-cases/user.use-case.module";
import { AppController } from "./controller/app-auth.controller";
import { MemberUseCaseModule } from "../member/use-cases/member.use-case.module";

@Module({
  imports: [AuthModule, UserUseCaseModule, MemberUseCaseModule],
  controllers: [AppController],
})
export class AppAuthModule {}
