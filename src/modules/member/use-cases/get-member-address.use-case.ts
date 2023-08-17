import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { MemberIdRequestDTO } from "../controller/dtos/member-id.request.dto";
import { MemberAddressResponseDTO } from "../controller/dtos/member-address.response.dto";
import { InjectMemberAddressRepository } from "src/modules/member-address/database/member-address.repository.provider";
import { MemberAddressRepositoryPort } from "src/modules/member-address/database/member-address.repository.port";
import { ResponseException } from "src/core/exceptions/response.http-exception";

@Injectable()
export class GetMemberAddress
  extends BaseUseCase
  implements IUseCase<MemberIdRequestDTO, MemberAddressResponseDTO>
{
  constructor(
    @InjectMemberAddressRepository
    private readonly memberAddressRepository: MemberAddressRepositoryPort,
  ) {
    super();
  }

  async execute({
    member_id,
  }: MemberIdRequestDTO): Promise<MemberAddressResponseDTO> {
    try {
      const result = await this.memberAddressRepository.findMemberAddress(
        member_id,
      );
      return new MemberAddressResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
