import { FunctionsErrorCode } from 'firebase-functions/lib/providers/https';

import AppError from './app-error';

export default function error({
  code,
  message,
  details
}: {
  code: FunctionsErrorCode;
  message: string;
  details?: unknown;
}) {
  return new AppError({ code, message, details });
}
