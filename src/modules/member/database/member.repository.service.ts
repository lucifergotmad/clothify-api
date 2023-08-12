import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { MemberMongoEntity } from "./model/member.mongo-entity";
import { MemberEntity } from "../domain/member.entity";
import { MemberRepositoryPort } from "./member.repository.port";
import { MemberMongoMapper } from "./model/member.mongo-mapper";

@Injectable()
export class MemberRepository
  extends BaseRepository<MemberMongoEntity, MemberEntity>
  implements MemberRepositoryPort
{
  constructor(
    @InjectModel(MemberMongoEntity.name)
    private MemberModel: Model<MemberMongoEntity>,
  ) {
    super(MemberModel, new MemberMongoMapper(MemberEntity, MemberMongoEntity));
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
