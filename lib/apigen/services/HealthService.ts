/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HealthService {

    /**
     * Show the status of the server.
     * Get the status of the server.
     * @returns any OK
     * @throws ApiError
     */
    public static getHealthCheck(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }

}
