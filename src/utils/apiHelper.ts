import get from 'lodash/get';

export function handleError(response: any) {
  let error = null;
  let result = null;
  if (response.ok) {
    if (response.status === 200 || response.status === 201) {
      result = get(response, ['data', 'data'], get(response, ['data']));
    } else {
      error = get(['data', 'message'], response);
    }
  } else {
    const { data } = response;
    const { message } = data || {};

    error = {
      value: response.problem,
      code: response.status,
      message,
      data: response.data,
    };
  }
  return { result, error };
}
