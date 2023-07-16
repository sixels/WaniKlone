/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { cards_StudyData } from './cards_StudyData';

export type cards_PartialSubject = {
    deck?: string;
    dependencies?: Array<string>;
    dependents?: Array<string>;
    id?: string;
    kind?: string;
    level?: number;
    name?: string;
    owner?: string;
    priority?: number;
    similars?: Array<string>;
    slug?: string;
    study_data?: Array<cards_StudyData>;
    value?: string;
    value_image?: string;
};

