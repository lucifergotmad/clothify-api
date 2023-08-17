import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { MemberAddressEntity } from "../../domain/member-address.entity";
import { MemberAddressMongoEntity } from "./member-address.mongo-entity";

export class MemberAddressMongoMapper extends DbMapper<
  MemberAddressEntity,
  MemberAddressMongoEntity
> {
  protected toMongoProps(
    entity: MemberAddressEntity,
  ): MongoEntityProps<MemberAddressMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<MemberAddressMongoEntity> = {
      ...props,
      title: props.title.value,
      type: props.type.value,
    };
    return mongoProps;
  }
}
