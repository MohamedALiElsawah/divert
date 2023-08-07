

export const setLoading = (flag) => ({
  type: 'CLIENTS_LOADING',
  payload: flag,
});
export const setError = (err) => ({
  type: 'CLIENTS_ERROR',
  payload: err,
});

export const storeUsers = (data) => ({
  type: 'STORE_USERS',
  payload: {
    data
  },
});


export const storeUserData = (data) => ({
  type: 'STORE_USER_DATA',
  payload: {
    data
  },
});

export const storeBranches = (data) => ({
  type: 'STORE_BRANCH_DATA',
  payload: {
    data
  },
});
