import { ApiProperty } from "@nestjs/swagger";
import { UserLevel } from "src/core/constants/app/user/user-level.const";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { IUserResponse } from "src/interface-adapter/interfaces/user/user.response.interface";

export class UserReponseDTO extends IdResponseDTO implements IUserResponse {
  /**
   *
   * @param props {IUserResponse}
   *
   * Transform Plain object into DTO useful for whitelisting data,
   * this will avoid data leak, and preventing return a whole bunch
   * of data to client.
   */
  constructor(props: IUserResponse) {
    super(props._id);
    this.fullname = props.fullname;
    this.username = props.username;
    this.level = props.level;
  }

  @ApiProperty({ example: "Octyo Paswa Putra" })
  fullname: string;

  @ApiProperty({ example: "lucifergotmad" })
  username: string;

  @ApiProperty({ example: UserLevel.Owner })
  level: string;
}
