/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { apicommon_APIResponse_array_tokens_UserTokenPartial } from '../models/apicommon_APIResponse_array_tokens_UserTokenPartial';
import type { apicommon_APIResponse_string } from '../models/apicommon_APIResponse_string';
import type { tokens_GenerateTokenRequest } from '../models/tokens_GenerateTokenRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Get all user's API tokens
     * Get all user's API tokens
     * @returns apicommon_APIResponse_array_tokens_UserTokenPartial OK
     * @throws ApiError
     */
    public static getTokenQuery(): CancelablePromise<apicommon_APIResponse_array_tokens_UserTokenPartial> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tokens',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a new API token
     * Creates a new API token with the given permissions
     * @param request The API token options
     * @returns apicommon_APIResponse_string Created
     * @throws ApiError
     */
    public static postTokenCreate(
        request: tokens_GenerateTokenRequest,
    ): CancelablePromise<apicommon_APIResponse_string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tokens',
            body: request,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete an API token
     * Deletes an API token by the given ID
     * @param id The API token ID
     * @returns void
     * @throws ApiError
     */
    public static deleteTokenDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tokens/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

}
