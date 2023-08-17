import { Module } from "@nestjs/common";
import { MemberAddressRepositoryModule } from "./database/member-address.repository.module";

@Module({
  imports: [MemberAddressRepositoryModule],
  controllers: [],
})
export class MemberAddressModule {}
