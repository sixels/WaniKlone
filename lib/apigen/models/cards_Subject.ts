/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { cards_Resource } from './cards_Resource';
import type { cards_StudyData } from './cards_StudyData';

export type cards_Subject = {
    additional_study_data?: Record<string, any>;
    created_at?: string;
    deck?: string;
    dependencies?: Array<string>;
    dependents?: Array<string>;
    id?: string;
    kind?: string;
    level?: number;
    /**
     * e.g. "ground", "一", nil, "一", 2
     */
    name?: string;
    owner?: string;
    priority?: number;
    resources?: Array<cards_Resource>;
    similars?: Array<string>;
    slug?: string;
    study_data?: Array<cards_StudyData>;
    updated_at?: string;
    value?: string;
    value_image?: string;
};

