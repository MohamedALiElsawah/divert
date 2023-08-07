

export const setLoading = (flag) => ({
  type: 'CLIENTS_LOADING',
  payload: flag,
});
export const setError = (err) => ({
  type: 'CLIENTS_ERROR',
  payload: err,
});

export const storeClients = (data) => ({
  type: 'STORE_CLIENTS',
  payload: {
    data
  },
});

export const storeClientData = (data) => ({
  type: 'STORE_CLIENT_DATA',
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


export const storeAddress = (data) => ({
  type: 'STORE_ADDRESS_DATA',
  payload: {
    data
  },
});


export const storePlans = (data) => ({
  type: 'STORE_PLANS',
  payload: {
    data
  },
});


export const storeOrders = (data) => ({
  type: 'STORE_ORDERS',
  payload: {
    data
  },
});


export const storeOrderDetails = (data) => ({
  type: 'STORE_ORDERS_DETAILS',
  payload: {
    data
  },
});

export const storeStatuses = (data) => ({
  type: 'STORE_ORDERS_STATUSES',
  payload: {
    data
  },
});
export const storeDrivers = (data) => ({
  type: 'STORE_DRIVERS',
  payload: {
    data
  },
});


export const storeClientDetails = (data) => ({
  type: 'STORE_CLIENTS_Details_LOOKUPS',
  payload: {
    data
  },
});
