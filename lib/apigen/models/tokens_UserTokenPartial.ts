/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { tokens_APITokenClaims } from './tokens_APITokenClaims';
import type { tokens_APITokenStatus } from './tokens_APITokenStatus';

export type tokens_UserTokenPartial = {
    claims?: tokens_APITokenClaims;
    id?: string;
    name?: string;
    prefix?: string;
    status?: tokens_APITokenStatus;
    used_at?: string;
};

