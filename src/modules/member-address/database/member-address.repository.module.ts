import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MemberAddressModel } from "./model/member-address.mongo-entity";
import { memberAddressRepositoryProvider } from "./member-address.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(MemberAddressModel)],
  providers: [memberAddressRepositoryProvider],
  exports: [memberAddressRepositoryProvider],
})
export class MemberAddressRepositoryModule {}
