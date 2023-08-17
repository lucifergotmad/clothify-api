import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "member-addresses" })
export class MemberAddressMongoEntity extends BaseMongoEntity<
  typeof MemberAddressMongoEntity
> {
  @Prop({ required: true, unique: true })
  member_id: string;

  @Prop({ required: true })
  province_id: string;

  @Prop({ required: true })
  province_name: string;

  @Prop({ required: true })
  city_id: string;

  @Prop({ required: true })
  city_name: string;

  @Prop({ required: true })
  postal_code: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  type: string;
}

export const MemberAddressSchema = SchemaFactory.createForClass(
  MemberAddressMongoEntity,
);
export const MemberAddressModel = [
  { name: MemberAddressMongoEntity.name, schema: MemberAddressSchema },
];

export type MemberAddressDocument = MemberAddressMongoEntity & Document;
