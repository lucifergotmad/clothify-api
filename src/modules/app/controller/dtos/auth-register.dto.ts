import { UserLevel } from "src/core/constants/app/user/user-level.const";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class AuthRegisterRequestDTO {
  @IsRequiredString({ example: "Octyo Paswa Putra" })
  fullname: string;

  @IsRequiredString({ example: "lucifergotmad" })
  username: string;

  @IsRequiredString({
    example: UserLevel.Owner,
    description: Object.values(UserLevel).join(","),
  })
  level: string;

  @IsRequiredString({ example: "binary1010" })
  password: string;
}
