import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { RegisterUser } from "src/modules/user/use-cases/register-user.use-case";
import { AuthService } from "src/infra/auth/auth.service";
import { LocalAuthGuard } from "src/infra/auth/local-auth.guard";
import { AuthLoginRequestDTO } from "./dtos/auth-login.request.dto";
import { AuthRegisterUserRequestDTO } from "./dtos/auth-register-user.dto";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { AuthLoginResponseDTO } from "./dtos/auth-login.response.dto";
import { HttpStatus } from "src/core/constants/error/status-code.const";
import { AuthRefreshTokenRequestDTO } from "./dtos/auth-refresh-token.dto";
import { RegisterMember } from "src/modules/member/use-cases/register-member.use-case";
import { AuthRegisterMemberRequestDTO } from "./dtos/auth-register-member-request.dto";

@Controller("v1")
@ApiTags("App Authentication")
export class AppController {
  constructor(
    private authService: AuthService,
    private createUser: RegisterUser,
    private createMember: RegisterMember,
  ) {}

  @Post("auth/register/member")
  @ApiCreatedResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  async registerMember(@Body() body: AuthRegisterMemberRequestDTO) {
    return await this.createMember.execute(body);
  }

  @Post("auth/register")
  @ApiCreatedResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: "Data already exists" })
  async register(@Body() body: AuthRegisterUserRequestDTO) {
    return await this.createUser.execute(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthLoginResponseDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorize User" })
  async login(@Body() body: AuthLoginRequestDTO) {
    return await this.authService.login(body);
  }

  @Post("auth/logout")
  async logout(@Body() body: AuthRefreshTokenRequestDTO) {
    return await this.authService.logout(body);
  }

  @Post("auth/token")
  async refreshToken(@Body() body: AuthRefreshTokenRequestDTO) {
    return await this.authService.refreshToken(body);
  }
}
