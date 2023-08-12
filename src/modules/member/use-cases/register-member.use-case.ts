import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { RegisterMemberRequestDTO } from "../controller/dtos/register-member-request.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { InjectMemberRepository } from "../database/member.repository.provider";
import { MemberRepositoryPort } from "../database/member.repository.port";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MemberEntity } from "../domain/member.entity";
import { Guard } from "src/core/logic/guard";

@Injectable()
export class RegisterMember
  extends BaseUseCase
  implements IUseCase<RegisterMemberRequestDTO, MessageResponseDTO>
{
  constructor(
    @InjectMemberRepository
    private readonly memberRepository: MemberRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  async execute(
    payload: RegisterMemberRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

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
          member_id: "",
          email: payload.email,
          fullname: payload.fullname,
          username: payload.username,
          password: payload.password,
          phone_number: payload.phone_number,
          point: 0,
        });

        await this.memberRepository.save(memberEntity, session);
      });
      return new MessageResponseDTO("Berhasil!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      session.endSession();
    }
  }
}
