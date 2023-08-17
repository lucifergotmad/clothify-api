import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { AddMemberAddressRequestDTO } from "../controller/dtos/add-member-address.request.dto";
import { InjectMemberAddressRepository } from "src/modules/member-address/database/member-address.repository.provider";
import { MemberAddressRepositoryPort } from "src/modules/member-address/database/member-address.repository.port";
import { Utils } from "src/core/utils/utils.service";
import { InjectMemberRepository } from "../database/member.repository.provider";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MemberIdRequestDTO } from "../controller/dtos/member-id.request.dto";
import { MemberAddressEntity } from "src/modules/member-address/domain/member-address.entity";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";

@Injectable()
export class AddMemberAddress
  extends BaseUseCase
  implements
    IUseCase<AddMemberAddressRequestDTO & MemberIdRequestDTO, IdResponseDTO>
{
  constructor(
    @InjectMemberAddressRepository
    private readonly memberAddressRepository: MemberAddressRepositoryPort,
    @InjectMemberRepository
    private readonly memberRepositry: MemberRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute({
    member_id,
    ...payload
  }: AddMemberAddressRequestDTO & MemberIdRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.memberRepositry.findOneOrThrow(
          { member_id },
          "Member cannot be found!",
          session,
        );

        await this.memberAddressRepository.findOneAndThrow(
          { member_id, title: payload.title },
          "Address with that title is already created!",
          session,
        );

        const memberAddressEntity = MemberAddressEntity.create({
          member_id,
          city_id: payload.city_id,
          city_name: payload.city_name,
          description: payload.description,
          postal_code: payload.postal_code,
          province_id: payload.province_id,
          province_name: payload.province_name,
          title: payload.title,
          type: payload.type,
        });

        result = await this.memberAddressRepository.save(
          memberAddressEntity,
          session,
        );
      });
      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      session.endSession();
    }
  }
}
