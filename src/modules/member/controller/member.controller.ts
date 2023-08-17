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

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor(private readonly addMemberAddress: AddMemberAddress) {}

  @SecurePost("address/:member_id")
  @ApiCreatedResponse({ type: MessageResponseDTO })
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
  updateAddress() {}
}
