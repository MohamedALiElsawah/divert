


export const setLoading = (flag) => ({
    type: 'ORDER_LOADING',
    payload: flag,
});
export const setError = (err) => ({
    type: 'ORDER_ERROR',
    payload: err,
});

export const storeStatus = (data) => ({
    type: 'STORE_STATUS',
    payload: {
        data
    },
});

export const storeReasons = (data) => ({
    type: 'STORE_REASONS',
    payload: {
        data
    },
});


export const storeStatusData= (data) => ({
    type: 'STORE_STATUS_DATA',
    payload: {
        data
    },
});


export const storeReasonsItems = (data) => ({
    type: 'STORE_REASONS_ITEMS',
    payload: {
        data
    },
});

