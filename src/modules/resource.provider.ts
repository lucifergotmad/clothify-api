import { AppAuthModule } from "./app/app-auth.module";
import { MemberModule } from "./member/member.module";
import { UserModule } from "./user/user.module";

const systemProviders = [AppAuthModule, UserModule];

const appProviders = [MemberModule];

export const resourceProviders = [...systemProviders, ...appProviders];
