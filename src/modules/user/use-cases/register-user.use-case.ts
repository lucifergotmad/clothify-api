import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { Utils } from "src/core/utils/utils.service";
import { AuthRegisterUserRequestDTO } from "src/modules/app/controller/dtos/auth-register-user.dto";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { UserRepositoryPort } from "../database/user.repository.port";
import { InjectUserRepository } from "../database/user.repository.provider";
import { UserEntity } from "../domain/user.entity";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { UserLevel } from "src/core/constants/app/user/user-level.const";

@Injectable()
export class RegisterUser
  extends BaseUseCase
  implements IUseCase<AuthRegisterUserRequestDTO, IdResponseDTO>
{
  constructor(
    @InjectUserRepository private userRepository: UserRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    user: AuthRegisterUserRequestDTO,
  ): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        if (user.level === UserLevel.Owner) {
          throw new BadRequestException("Cannot create user with Level Owner!");
        }

        await this.userRepository.findOneAndThrow(
          { username: user.username },
          "Username are already use!",
          session,
        );

        const userEntity = await UserEntity.create({
          fullname: user.fullname,
          password: user.password,
          username: user.username,
          level: user.level,
        });

        result = await this.userRepository.save(userEntity, session);
      });

      return new IdResponseDTO(result._id);
    } catch (err) {
      throw new ResponseException(err.message, err.status, err.trace);
    } finally {
      session.endSession();
    }
  }
}
