import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { UpdateMemberAddressRequestDTO } from "../controller/dtos/update-member-address.request.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { InjectMemberAddressRepository } from "src/modules/member-address/database/member-address.repository.provider";
import { MemberAddressRepositoryPort } from "src/modules/member-address/database/member-address.repository.port";
import { Utils } from "src/core/utils/utils.service";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { MemberAddressMongoEntity } from "src/modules/member-address/database/model/member-address.mongo-entity";

@Injectable()
export class UpdateMemberAddress
  extends BaseUseCase
  implements IUseCase<UpdateMemberAddressRequestDTO & IId, MessageResponseDTO>
{
  constructor(
    @InjectMemberAddressRepository
    private readonly memberAddressRepository: MemberAddressRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute({
    _id,
    ...data
  }: UpdateMemberAddressRequestDTO & IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await session.withTransaction(async () => {
        const memberAddress = await this.memberAddressRepository.findById(_id);
        if (!memberAddress) {
          throw new BadRequestException("Member address not found!");
        }

        await this.memberAddressRepository.findOneAndThrow(
          { member_id: memberAddress.member_id, title: data.title },
          "Cannot update address, duplicate type!",
        );

        const payload: Partial<MemberAddressMongoEntity> = data;
        await this.memberAddressRepository.update({ _id }, payload, session);
      });
      return new MessageResponseDTO("Success update member address!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      session.endSession();
    }
  }
}
