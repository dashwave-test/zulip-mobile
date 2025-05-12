/* @flow strict-local */
import type { Auth, ApiResponse } from './transportTypes';
import { apiDelete } from './apiFetch';

/**
 * Delete an attachment.
 *
 * This API is not officially documented in the Zulip API docs, but it's
 * available in the Zulip server code. It allows deleting an attachment by ID.
 */
export default async (auth: Auth, attachmentId: number): Promise<ApiResponse> =>
  apiDelete(auth, `attachments/${attachmentId}`);