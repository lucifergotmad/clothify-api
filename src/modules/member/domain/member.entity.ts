import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { Password } from "./value-objects/password.value-object";
import { Email } from "./value-objects/email.value-object";
import { PhoneNumber } from "./value-objects/phone-number.value-object";

export interface MemberProps {
  member_id: string;
  fullname: string;
  username: string;
  password: Password;
  email: Email;
  phone_number: PhoneNumber;
  point: number;
}

export interface MemberFactoryProps
  extends Omit<MemberProps, "password" | "email" | "phone_number"> {
  password: string;
  email: string;
  phone_number: string;
}

export class MemberEntity extends AggregateRoot<MemberProps> {
  constructor(props: MemberProps) {
    super(props);
  }

  static async create(props: MemberFactoryProps) {
    const password = await Password.create(props.password);
    const email = new Email(props.email);
    const phoneNumber = new PhoneNumber(props.phone_number);

    return new MemberEntity({
      ...props,
      password,
      email,
      phone_number: phoneNumber,
    });
  }
}
