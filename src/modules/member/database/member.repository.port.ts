import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { MemberMongoEntity } from "./model/member.mongo-entity";
import { MemberEntity } from "../domain/member.entity";

export interface MemberRepositoryPort
  extends BaseRepositoryPort<MemberMongoEntity, MemberEntity> {
  __init__(): void;
}
