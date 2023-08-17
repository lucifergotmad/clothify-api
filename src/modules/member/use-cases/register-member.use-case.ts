import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { InjectMemberRepository } from "../database/member.repository.provider";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MemberEntity } from "../domain/member.entity";
import { Guard } from "src/core/logic/guard";
import { AuthRegisterMemberRequestDTO } from "src/modules/app/controller/dtos/auth-register-member-request.dto";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";

@Injectable()
export class RegisterMember
  extends BaseUseCase
  implements IUseCase<AuthRegisterMemberRequestDTO, IdResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(payload: AuthRegisterMemberRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        if (Guard.isInvalidPassword(payload.password)) {
          throw new BadRequestException(
            "Password must atleast 8 characters, 1 uppercase, 1 lowercase!",
          );
        }

        await this.memberRepository.findOneAndThrow(
          { email: payload.email },
          "Email already used!",
        );

        await this.memberRepository.findOneAndThrow(
          { username: payload.username },
          "Username already used!",
        );

        const memberEntity = await MemberEntity.create({
          member_id: await this._generateMemberId(),
          email: payload.email,
          fullname: payload.fullname,
          username: payload.username,
          password: payload.password,
          phone_number: payload.phone_number,
          point: 0,
        });

        result = await this.memberRepository.save(memberEntity, session);
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      session.endSession();
    }
  }

  private async _generateMemberId() {
    let memberId: string;

    const latestMember = await this.memberRepository.findOneLatest({});

    if (!latestMember) {
      memberId = "CL00000001";
    } else {
      memberId =
        latestMember.member_id.substring(0, 3) +
        String(
          Number(
            latestMember.member_id.slice(3, latestMember.member_id.length),
          ) + 1,
        ).padStart(7, "0");
    }

    return memberId;
  }
}
