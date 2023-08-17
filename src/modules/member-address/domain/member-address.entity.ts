import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { Title } from "./value-objects/title.value-object";
import { Type } from "./value-objects/type.value-object";

export interface MemberAddressProps {
  member_id: string;
  province_id: string;
  province_name: string;
  city_id: string;
  city_name: string;
  postal_code: string;
  description: string;
  title: Title;
  type: Type;
}

export interface MemberAddressFactoryProps
  extends Omit<MemberAddressProps, "title" | "type"> {
  title: string;
  type: string;
}

export class MemberAddressEntity extends AggregateRoot<MemberAddressProps> {
  constructor(props: MemberAddressProps) {
    super(props);
  }

  static create(props: MemberAddressFactoryProps) {
    const title = new Title(props.title);
    const type = new Type(props.type);

    return new MemberAddressEntity({ ...props, title, type });
  }
}
