import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class RegisterMemberRequestDTO {
  @IsRequiredString()
  fullname: string;

  @IsRequiredString()
  username: string;

  @IsRequiredString()
  password: string;

  @IsRequiredString()
  email: string;

  @IsRequiredString()
  phone_number: string;
}
