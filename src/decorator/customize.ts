// import { Role } from '@/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const RESPONSE_MESSAGE = 'response_message';
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);

// export const ROLES_KEY = 'roles';
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// export const CHECK_POLICIES_KEY = 'check_policy';
// export const CheckPolicies = (...handlers: PolicyHandler[]) =>
//   SetMetadata(CHECK_POLICIES_KEY, handlers);
