import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { MemberAddressMongoEntity } from "./model/member-address.mongo-entity";
import { MemberAddressEntity } from "../domain/member-address.entity";
import { MemberAddressRepositoryPort } from "./member-address.repository.port";
import { MemberAddressMongoMapper } from "./model/member-address.mongo-mapper";

@Injectable()
export class MemberAddressRepository
  extends BaseRepository<MemberAddressMongoEntity, MemberAddressEntity>
  implements MemberAddressRepositoryPort
{
  constructor(
    @InjectModel(MemberAddressMongoEntity.name)
    private MemberAddressModel: Model<MemberAddressMongoEntity>,
  ) {
    super(
      MemberAddressModel,
      new MemberAddressMongoMapper(
        MemberAddressEntity,
        MemberAddressMongoEntity,
      ),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
