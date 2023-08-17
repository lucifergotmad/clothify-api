import { Inject, Provider } from "@nestjs/common";
import { MemberAddressRepository } from "./member-address.repository.service";

export const InjectMemberAddressRepository = Inject(
  MemberAddressRepository.name,
);

export const memberAddressRepositoryProvider: Provider = {
  provide: MemberAddressRepository.name,
  useClass: MemberAddressRepository,
};
