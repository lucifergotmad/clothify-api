import { UnprocessableEntityException } from "@nestjs/common";
import { ValueObject } from "src/core/base-classes/domain/value-object";
import { DomainPrimitive } from "src/core/base-classes/types/domain-primitive.type";
import { Guard } from "src/core/logic/guard";

export class Type extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (Guard.isInvalidAddressType(value)) {
      throw new UnprocessableEntityException("Address Type not valid!");
    }
  }
}
