import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { AddMemberAddress } from "../use-cases/add-member-address.use-case";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { Body, Param } from "@nestjs/common";
import { AddMemberAddressRequestDTO } from "./dtos/add-member-address.request.dto";
import { MemberIdRequestDTO } from "./dtos/member-id.request.dto";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { UpdateMemberAddress } from "../use-cases/update-member-address.use-case";
import { UpdateMemberAddressRequestDTO } from "./dtos/update-member-address.request.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor(
    private readonly addMemberAddress: AddMemberAddress,
    private readonly updateMemberAddress: UpdateMemberAddress,
  ) {}

  @SecurePost("address/:member_id")
  @ApiCreatedResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists!" })
  addAddress(
    @Body() body: AddMemberAddressRequestDTO,
    @Param() params: MemberIdRequestDTO,
  ) {
    return this.addMemberAddress.execute({
      ...body,
      member_id: params.member_id,
    });
  }

  @SecurePut("address/:_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  updateAddress(
    @Body() body: UpdateMemberAddressRequestDTO,
    @Param() param: IId,
  ) {
    return this.updateMemberAddress.execute({ ...body, ...param });
  }
}
