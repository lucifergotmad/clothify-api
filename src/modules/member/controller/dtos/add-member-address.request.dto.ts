import { AddressTitle } from "src/core/constants/app/user/address-title.const";
import { AddressType } from "src/core/constants/app/user/address-type.const";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class AddMemberAddressRequestDTO {
  @IsRequiredString({ example: "5" })
  province_id: string;

  @IsRequiredString({ example: "DI Yogyakarta" })
  province_name: string;

  @IsRequiredString({ example: "39" })
  city_id: string;

  @IsRequiredString({ example: "Bantul" })
  city_name: string;

  @IsRequiredString({ example: AddressType.Regency })
  type: string;

  @IsRequiredString({ example: "55700" })
  postal_code: string;

  @IsRequiredString({ example: AddressTitle.Home })
  title: string;

  @IsRequiredString({ example: "Jl. Pembangunan No. 10 RT. 02 RW 03" })
  description: string;
}
