/* @flow strict-local */
import type { Auth, ApiResponseSuccess } from './transportTypes';
import { apiGet } from './apiFetch';

export type Attachment = {|
  id: number,
  name: string,
  path_id: string,
  size: number,
  create_time: number,
  messages: $ReadOnlyArray<{|
    id: number,
    date_sent: number,
  |}>,
|};

type ApiResponseAttachments = {|
  ...$Exact<ApiResponseSuccess>,
  attachments: $ReadOnlyArray<Attachment>,
  upload_space_used: number,
|};

/**
 * Fetch metadata on files uploaded by the requesting user.
 * 
 * See https://zulip.com/api/get-attachments
 */
export default async (auth: Auth): Promise<ApiResponseAttachments> =>
  apiGet(auth, 'attachments');