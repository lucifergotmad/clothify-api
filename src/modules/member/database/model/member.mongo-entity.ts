import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "members" })
export class MemberMongoEntity extends BaseMongoEntity<
  typeof MemberMongoEntity
> {
  @Prop({ required: true, unique: true })
  member_id: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  phone_number?: string;

  @Prop({ required: true })
  point: number;
}

export const MemberSchema = SchemaFactory.createForClass(MemberMongoEntity);
export const MemberModel = [
  { name: MemberMongoEntity.name, schema: MemberSchema },
];

export type MemberDocument = MemberMongoEntity & Document;
