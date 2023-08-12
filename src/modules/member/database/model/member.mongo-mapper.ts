import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { MemberEntity } from "../../domain/member.entity";
import { MemberMongoEntity } from "./member.mongo-entity";

export class MemberMongoMapper extends DbMapper<
  MemberEntity,
  MemberMongoEntity
> {
  protected toMongoProps(
    entity: MemberEntity,
  ): MongoEntityProps<MemberMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<MemberMongoEntity> = {
      ...props,
      password: props.password.value,
      email: props.email.value,
      phone_number: props.phone_number.value,
    };
    return mongoProps;
  }
}
