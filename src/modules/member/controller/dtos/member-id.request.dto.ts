import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class MemberIdRequestDTO {
  @IsRequiredString({ example: "CL00000001" })
  member_id: string;
}
