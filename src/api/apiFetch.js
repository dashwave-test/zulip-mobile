/* @flow strict-local */
import type { Auth, ApiResponseSuccess, ApiResponse } from './transportTypes';
import { getAuthHeaders } from './transport';
import { encodeParamsForUrl, isValidUrl } from '../utils/url';
import userAgent from '../utils/userAgent';
import { networkActivityStart, networkActivityStop } from '../utils/networkActivity';
import { ApiError, NetworkError } from './apiErrors';

const apiVersion = 'api/v1';

export const objectToParams = (obj: {| +[string]: mixed |}) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const getFetchParams = (auth: Auth, params: {} = {}) => {
  const allParams = {
    ...params,
  };

  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'User-Agent': userAgent,
      ...getAuthHeaders(auth),
    },
    body: encodeParamsForUrl(allParams),
  };
};

export const apiFetch = async (auth: Auth, route: string, params: {} = {}) => {
  const url = `${auth.realm.toString()}${apiVersion}/${route}`;
  if (!isValidUrl(url)) {
    throw new Error(`Invalid URL: ${url}`);
  }

  const allParams = {
    ...params,
  };

  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'User-Agent': userAgent,
      ...getAuthHeaders(auth),
    },
    body: encodeParamsForUrl(allParams),
  });
};

export const apiCall = async (
  auth: Auth,
  route: string,
  params: {} = {},
): Promise<ApiResponseSuccess> => {
  try {
    networkActivityStart();
    const response = await apiFetch(auth, route, params);
    const json = await response.json().catch(() => {
      throw new Error(`Response not JSON: ${response.statusText}`);
    });
    if (!response.ok || json.result !== 'success') {
      throw new ApiError(json.msg, json.code, response.status);
    }
    return json;
  } finally {
    networkActivityStop();
  }
};

export const apiGet = async (
  auth: Auth,
  route: string,
  params: {} = {},
): Promise<ApiResponseSuccess> => {
  const allParams = {
    ...params,
  };
  const url = `${auth.realm.toString()}${apiVersion}/${route}?${encodeParamsForUrl(allParams)}`;
  try {
    networkActivityStart();
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'User-Agent': userAgent,
        ...getAuthHeaders(auth),
      },
    });
    const json = await response.json().catch(() => {
      throw new Error(`Response not JSON: ${response.statusText}`);
    });
    if (!response.ok || json.result !== 'success') {
      throw new ApiError(json.msg, json.code, response.status);
    }
    return json;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    }
    throw new NetworkError(e.message);
  } finally {
    networkActivityStop();
  }
};

export const apiDelete = async (
  auth: Auth,
  route: string,
  params: {} = {},
): Promise<ApiResponse> => {
  const url = `${auth.realm.toString()}${apiVersion}/${route}`;
  try {
    networkActivityStart();
    const response = await fetch(url, {
      method: 'delete',
      headers: {
        'User-Agent': userAgent,
        ...getAuthHeaders(auth),
      },
      body: encodeParamsForUrl(params),
    });
    const json = await response.json().catch(() => {
      throw new Error(`Response not JSON: ${response.statusText}`);
    });
    if (!response.ok || json.result !== 'success') {
      throw new ApiError(json.msg, json.code, response.status);
    }
    return json;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    }
    throw new NetworkError(e.message);
  } finally {
    networkActivityStop();
  }
};

export const apiFile = async (
  auth: Auth,
  route: string,
  body: FormData,
): Promise<ApiResponseSuccess> => {
  try {
    networkActivityStart();
    const url = `${auth.realm.toString()}${apiVersion}/${route}`;
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'User-Agent': userAgent,
        ...getAuthHeaders(auth),
      },
      body,
    });
    const json = await response.json().catch(() => {
      throw new Error(`Response not JSON: ${response.statusText}`);
    });
    if (!response.ok || json.result !== 'success') {
      throw new ApiError(json.msg, json.code, response.status);
    }
    return json;
  } finally {
    networkActivityStop();
  }
};

export const apiPatch = async (
  auth: Auth,
  route: string,
  params: {} = {},
): Promise<ApiResponseSuccess> => {
  try {
    networkActivityStart();
    const url = `${auth.realm.toString()}${apiVersion}/${route}`;
    const response = await fetch(url, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'User-Agent': userAgent,
        ...getAuthHeaders(auth),
      },
      body: encodeParamsForUrl(params),
    });
    const json = await response.json().catch(() => {
      throw new Error(`Response not JSON: ${response.statusText}`);
    });
    if (!response.ok || json.result !== 'success') {
      throw new ApiError(json.msg, json.code, response.status);
    }
    return json;
  } finally {
    networkActivityStop();
  }
};

export const apiPut = async (
  auth: Auth,
  route: string,
  params: {} = {},
): Promise<ApiResponseSuccess> => {
  try {
    networkActivityStart();
    const url = `${auth.realm.toString()}${apiVersion}/${route}`;
    const response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'User-Agent': userAgent,
        ...getAuthHeaders(auth),
      },
      body: encodeParamsForUrl(params),
    });
    const json = await response.json().catch(() => {
      throw new Error(`Response not JSON: ${response.statusText}`);
    });
    if (!response.ok || json.result !== 'success') {
      throw new ApiError(json.msg, json.code, response.status);
    }
    return json;
  } finally {
    networkActivityStop();
  }
};