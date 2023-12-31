import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";
import { UserLevel } from "src/core/constants/app/user/user-level.const";

@Schema({ collection: "users" })
export class UserMongoEntity extends BaseMongoEntity<typeof UserMongoEntity> {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLevel,
    default: UserLevel.Admin,
  })
  level: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoEntity);
export const UserModel = [{ name: UserMongoEntity.name, schema: UserSchema }];

export type UserDocument = UserMongoEntity & Document;
