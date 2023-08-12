import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";

@ControllerProperty("v1/members", "[Master] Members")
export class MemberController {
  constructor() {}
}
