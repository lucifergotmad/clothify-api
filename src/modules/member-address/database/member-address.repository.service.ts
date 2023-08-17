import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import { MemberAddressMongoEntity } from "./model/member-address.mongo-entity";
import { MemberAddressEntity } from "../domain/member-address.entity";
import { MemberAddressRepositoryPort } from "./member-address.repository.port";
import { MemberAddressMongoMapper } from "./model/member-address.mongo-mapper";
import { MemberAddressResponseDTO } from "src/modules/member/controller/dtos/member-address.response.dto";
import { MemberAddressIgnore } from "src/core/constants/encryption/encryption-ignore";

@Injectable()
export class MemberAddressRepository
  extends BaseRepository<MemberAddressMongoEntity, MemberAddressEntity>
  implements MemberAddressRepositoryPort
{
  constructor(
    @InjectModel(MemberAddressMongoEntity.name)
    private MemberAddressModel: Model<MemberAddressMongoEntity>,
  ) {
    super(
      MemberAddressModel,
      new MemberAddressMongoMapper(
        MemberAddressEntity,
        MemberAddressMongoEntity,
      ),
      MemberAddressIgnore,
    );
  }

  async findMemberAddress(
    member_id: string,
  ): Promise<MemberAddressResponseDTO> {
    const result = await this.MemberAddressModel.aggregate([
      {
        $match: {
          member_id,
        },
      },
      {
        $group: {
          _id: "$member_id",
          address_list: {
            $push: {
              _id: "$_id",
              province_id: "$provice_id",
              province_name: "$province_name",
              city_id: "$city_id",
              city_name: "$city_name",
              postal_code: "$postal_code",
              description: "$description",
              title: "$title",
              type: "$type",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          member_id: "$_id",
          address_list: "$address_list",
        },
      },
    ]);

    return this.encryptor.doDecrypt(result[0], [
      ...MemberAddressIgnore,
      "member_id",
    ]);
  }
}
