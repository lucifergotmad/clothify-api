import { ApiProperty } from "@nestjs/swagger";
import { AddressTitle } from "src/core/constants/app/user/address-title.const";
import { AddressType } from "src/core/constants/app/user/address-type.const";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import {
  IDetailAddressResponse,
  IMemberAddressResponse,
} from "src/interface-adapter/interfaces/member-address/member-address.response.interface";

class DetailAddressResponseDTO
  extends IdResponseDTO
  implements IDetailAddressResponse
{
  constructor(props: IDetailAddressResponse) {
    super(props._id);
    this.province_id = props.province_id;
    this.province_name = props.province_name;
    this.city_id = props.city_id;
    this.city_name = props.city_name;
    this.postal_code = props.postal_code;
    this.description = props.description;
    this.title = props.title;
    this.type = props.type;
  }

  @ApiProperty({ example: "5" })
  province_id: string;

  @ApiProperty({ example: "DI Yogyakarta" })
  province_name: string;

  @ApiProperty({ example: "39" })
  city_id: string;

  @ApiProperty({ example: "Bantul" })
  city_name: string;

  @ApiProperty({ example: "55700" })
  postal_code: string;

  @ApiProperty({ example: "Jl. Pembangunan No. 10 RT. 02 RW. 03" })
  description: string;

  @ApiProperty({ enum: AddressTitle })
  title: string;

  @ApiProperty({ enum: AddressType })
  type: string;
}

export class MemberAddressResponseDTO implements IMemberAddressResponse {
  constructor(props: IMemberAddressResponse) {
    this.member_id = props.member_id;
    this.address_list = props.address_list;
  }

  @ApiProperty({ example: "CL00000001" })
  member_id: string;

  @ApiProperty()
  address_list: DetailAddressResponseDTO[];
}
