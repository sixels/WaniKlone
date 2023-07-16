/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @returns void
     * @throws ApiError
     */
    public static postApiTodoV1Subject(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/apiTODO/v1/subject',
        });
    }

}
