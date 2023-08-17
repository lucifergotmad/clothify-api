import { Injectable } from "@nestjs/common";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { UserRepository } from "src/modules/user/database/user.repository.service";
import { Utils } from "src/core/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginResponseDTO } from "src/modules/app/controller/dtos/auth-login.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { EnvService } from "../configs/env.service";
import { AuthRefreshTokenRequestDTO } from "src/modules/app/controller/dtos/auth-refresh-token.dto";
import { ExceptionUnauthorize } from "src/core/exceptions/unauthorize.exception";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { AuthLoginRequestDTO } from "src/modules/app/controller/dtos/auth-login.request.dto";
import { MemberRepository } from "src/modules/member/database/member.repository.service";
import { MemberMongoEntity } from "src/modules/member/database/model/member.mongo-entity";

@Injectable()
export class AuthService {
  constructor(
    private memberRepository: MemberRepository,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private envService: EnvService,
    private utils: Utils,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ username });
    const member = await this.memberRepository.findOne({ username });

    if (user) {
      const passwordMatch = await this.utils.hash.compare(
        password,
        user.password,
      );

      if (passwordMatch) {
        delete user.password;
        return user;
      }
    }

    if (member) {
      const passwordMatch = await this.utils.hash.compare(
        password,
        member.password,
      );

      if (passwordMatch) {
        delete member.password;
        return member;
      }
    }
    return null;
  }

  async login(body: AuthLoginRequestDTO) {
    try {
      const user = await this.userRepository.findOne({
        username: body.username,
      });

      const member = await this.memberRepository.findOne({
        username: body.username,
      });

      const { accessToken, refreshToken } = await this.registerToken(
        user ?? member,
      );

      return new AuthLoginResponseDTO({
        accessToken,
        refreshToken,
        username: user?.username ?? member?.username,
        level: user?.level,
        fullname: member?.fullname,
        email: member?.email,
        phone_number: member?.phone_number,
      });
    } catch (error) {
      throw new ResponseException(error.response, error.status, error.trace);
    }
  }

  async logout(body: AuthRefreshTokenRequestDTO) {
    await this.utils.cache.delete(body.refresh_token);
    await this.utils.cache.delete(body.username);
    return new MessageResponseDTO("Berhasil Logout");
  }

  async registerToken(user: Partial<UserMongoEntity | MemberMongoEntity>) {
    const payload = { sub: user.username };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.envService.jwtLimit,
      secret: this.envService.jwtRefreshKey,
    });

    return { accessToken: token, refreshToken };
  }

  async refreshToken(body: AuthRefreshTokenRequestDTO) {
    try {
      await this._validateRefreshToken(body);

      const payload = { sub: body.username };
      const token = this.jwtService.sign(payload);
      await this.utils.cache.set(body.username, true);
      return { access_token: token };
    } catch (error) {
      throw new ResponseException(error.response, error.status, error.trace);
    }
  }

  private async _validateRefreshToken(body: AuthRefreshTokenRequestDTO) {
    const validToken = await this.utils.cache.get(body.refresh_token);
    if (!validToken || body.username !== validToken) {
      throw new ExceptionUnauthorize("Invalid Refresh Token.", this);
    }
  }
}
