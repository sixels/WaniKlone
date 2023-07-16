/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { cards_PartialSubject } from '../models/cards_PartialSubject';
import type { cards_Subject } from '../models/cards_Subject';
import type { cards_UpdateSubjectRequest } from '../models/cards_UpdateSubjectRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CardsService {

    /**
     * Query all subjects
     * Return a list of all subjects
     * @returns cards_PartialSubject OK
     * @throws ApiError
     */
    public static getSubjectAll(): CancelablePromise<Array<cards_PartialSubject>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subject',
        });
    }

    /**
     * Query a subject
     * Search a subject by its name
     * @param name Subject name
     * @returns cards_Subject OK
     * @throws ApiError
     */
    public static getSubjectQuery(
        name: string,
    ): CancelablePromise<cards_Subject> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subject/{name}',
            path: {
                'name': name,
            },
        });
    }

    /**
     * Delete a subject
     * Delete a subject by its name
     * @param name Subject name
     * @returns any OK
     * @throws ApiError
     */
    public static deleteSubjectDelete(
        name: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/subject/{name}',
            path: {
                'name': name,
            },
        });
    }

    /**
     * Update a subject
     * Update a subject with the given values
     * @param name Subject name
     * @param subject Subject fields to update
     * @returns cards_Subject OK
     * @throws ApiError
     */
    public static patchSubjectUpdate(
        name: string,
        subject: cards_UpdateSubjectRequest,
    ): CancelablePromise<cards_Subject> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subject/{name}',
            path: {
                'name': name,
            },
            body: subject,
        });
    }

}
