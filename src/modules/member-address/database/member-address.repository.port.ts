import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { MemberAddressMongoEntity } from "./model/member-address.mongo-entity";
import { MemberAddressEntity } from "../domain/member-address.entity";
import { MemberAddressResponseDTO } from "src/modules/member/controller/dtos/member-address.response.dto";

export interface MemberAddressRepositoryPort
  extends BaseRepositoryPort<MemberAddressMongoEntity, MemberAddressEntity> {
  findMemberAddress(member_id: string): Promise<MemberAddressResponseDTO>;
}
