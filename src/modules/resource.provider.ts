import { AppAuthModule } from "./app/app-auth.module";
import { MemberAddressModule } from "./member-address/member-address.module";
import { MemberModule } from "./member/member.module";
import { UserModule } from "./user/user.module";

const systemProviders = [AppAuthModule, UserModule];

const appProviders = [MemberModule, MemberAddressModule];

export const resourceProviders = [...systemProviders, ...appProviders];
