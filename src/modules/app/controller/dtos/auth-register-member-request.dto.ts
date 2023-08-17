import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class AuthRegisterMemberRequestDTO {
  @IsRequiredString({ example: "Octyo Paswa Putra" })
  fullname: string;

  @IsRequiredString({ example: "lucifergotmad" })
  username: string;

  @IsRequiredString({ example: "Binary1010" })
  password: string;

  @IsRequiredString({ example: "lucifergotmad@gmail.com" })
  email: string;

  @IsRequiredString({ example: "081952682145" })
  phone_number: string;
}
