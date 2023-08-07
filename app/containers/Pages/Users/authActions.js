

export const setLoading = (flag) => ({
  type: 'AUTH_LOADING',
  payload: flag,
});
export const setError = (err) => ({
  type: 'AUTH_ERROR',
  payload: err,
});

export const setUserData = (data) => ({
  type: 'setUserData',
  payload: data,
});
