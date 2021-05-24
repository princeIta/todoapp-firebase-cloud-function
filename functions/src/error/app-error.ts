import * as functions from 'firebase-functions';
import { FunctionsErrorCode } from 'firebase-functions/lib/providers/https';

export default class AppError extends functions.https.HttpsError {
  constructor({
    code = 'internal',
    message = 'INTERNAL',
    details
  }: {
    code: FunctionsErrorCode;
    message: string;
    details: unknown;
  }) {
    super(code, message, details);
  }
}
