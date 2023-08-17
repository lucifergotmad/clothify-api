import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { MemberAddressMongoEntity } from "./model/member-address.mongo-entity";
import { MemberAddressEntity } from "../domain/member-address.entity";

export interface MemberAddressRepositoryPort
  extends BaseRepositoryPort<MemberAddressMongoEntity, MemberAddressEntity> {
  __init__(): void;
}
