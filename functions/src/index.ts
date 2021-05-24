import * as functions from 'firebase-functions';

import requestApi from './request-api';

export const task = functions.https.onRequest(requestApi);
