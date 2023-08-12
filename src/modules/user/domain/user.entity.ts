import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { Password } from "./value-objects/password.value-object";
import { Level } from "./value-objects/level.value-object";

export interface UserProps {
  fullname: string;
  username: string;
  level: Level;
  password: Password;
}

export interface UserFactoryProps
  extends Omit<UserProps, "password" | "level"> {
  password: string;
  level: string;
}

export class UserEntity extends AggregateRoot<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  static async create(props: UserFactoryProps) {
    const password = await Password.create(props.password);
    const level = new Level(props.level);

    return new UserEntity({
      fullname: props.fullname,
      username: props.username,
      level: level,
      password: password,
    });
  }
}
