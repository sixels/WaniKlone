/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { cards_Resource } from './cards_Resource';
import type { cards_StudyData } from './cards_StudyData';

export type cards_UpdateSubjectRequest = {
    additional_study_data?: Record<string, any>;
    dependencies?: Array<string>;
    dependents?: Array<string>;
    kind?: string;
    level?: number;
    name?: string;
    priority?: number;
    resources?: Array<cards_Resource>;
    similars?: Array<string>;
    slug?: string;
    study_data?: Array<cards_StudyData>;
    value?: string;
    value_image?: string;
};

