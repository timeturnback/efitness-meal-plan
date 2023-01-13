import get from 'lodash/get';

export async function handleError(response: any) {
  let error = null;
  let result = null;
  if (response.ok) {
    if (response.status === 200 || response.status === 201) {
      result = await get(response, ['data', 'data'], get(response, ['data']));
    } else {
      error = await get(['data', 'message'], response);
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
