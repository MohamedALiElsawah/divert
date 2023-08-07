


export const setLoading = (flag) => ({
    type: 'CLIENTS_LOADING',
    payload: flag,
});
export const setError = (err) => ({
    type: 'CLIENTS_ERROR',
    payload: err,
});

export const storeGovernorates = (data) => ({
    type: 'STORE_GOVERNORATES',
    payload: {
        data
    },
});

export const storeAreas = (data) => ({
    type: 'STORE_AREAS',
    payload: {
        data
    },
});
export const storeBlocks = (data) => ({
    type: 'STORE_BLOCKS',
    payload: {
        data
    },
});

export const storeGovernorateData= (data) => ({
    type: 'STORE_GOVERNORATET_DATA',
    payload: {
        data
    },
});

export const storeClientData= (data) => ({
    type: 'STORE_CLIENT_DATA',
    payload: {
        data
    },
});


