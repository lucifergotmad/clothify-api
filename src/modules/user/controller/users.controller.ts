import { Body, Get, Param, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureDelete } from "src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { DeleteUser } from "src/modules/user/use-cases/delete-user.use-case";
import { UpdateUser } from "src/modules/user/use-cases/update-user.use-case";
import { UserMongoEntity } from "../database/model/user.mongo-entity";
import { UserRepository } from "../database/user.repository.service";
import { FindUserById } from "../use-cases/find-user-by-id.use-case";
import { UpdateUserRequestDTO } from "./dtos/update-user.request.dto";
import { UserReponseDTO } from "./dtos/user.reponse.dto";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { RegisterUser } from "../use-cases/register-user.use-case";
import { CreateUserRequestDTO } from "./dtos/create-user.request.dto";

@ControllerProperty("v1/users", "[Master] Users")
export class UsersController {
  constructor(
    private readonly createUser: RegisterUser,
    private readonly deleteUser: DeleteUser,
    private readonly updateUser: UpdateUser,
    private readonly findUserById: FindUserById,
    private readonly userRepository: UserRepository,
  ) {}

  @SecurePost()
  @ApiCreatedResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  async create(@Body() body: CreateUserRequestDTO) {
    return await this.createUser.execute(body);
  }

  @Get()
  @ApiOkResponse({ type: UserReponseDTO, isArray: true })
  async findAll() {
    return (await this.userRepository.findAll()).map(
      (user: UserMongoEntity) => new UserReponseDTO(user),
    );
  }

  @SecureGet(":_id")
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  @ApiOkResponse({ type: UserReponseDTO })
  findOne(@Param("_id") id: string) {
    return this.findUserById.execute(id);
  }

  @SecurePut(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  update(@Param("_id") _id: string, @Body() body: UpdateUserRequestDTO) {
    return this.updateUser.execute({ _id, ...body });
  }

  @SecureDelete(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  remove(@Param("_id") id: string) {
    return this.deleteUser.execute(id);
  }
}
