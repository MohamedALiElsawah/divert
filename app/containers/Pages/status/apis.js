
import { API_URLS } from '../../../api/serviceURL';
import axios from 'axios';
import Cookies from 'js-cookie'

let headers = {
    headers: {
        'Authorization': 'Bearer ' + Cookies.get('payload'),
    }
}


export function getStatusApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.status.list, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function deleteStatusApi(id) {
    return new Promise((resolve, reject) => {
        axios.delete(API_URLS.order.status.delete(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}




export function createStatusApi(data) {
    return new Promise((resolve, reject) => {
        axios.post(API_URLS.order.status.create, data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function getStatusDetailsApi(id) {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.status.details(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function editGovernorateApi(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(API_URLS.order.status.edit(id), data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}





export function getReasonsApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.reason.list, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function deleteReasonApi(id) {
    return new Promise((resolve, reject) => {
        axios.delete(API_URLS.order.reason.delete(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}




export function createReasonApi(data) {
    return new Promise((resolve, reject) => {
        axios.post(API_URLS.order.reason.create, data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function getReasonDetailsApis(id) {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.reason.details(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function editReasonApis(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(API_URLS.order.reason.edit(id), data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}




export function getReasonItemsApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.reasonItem.list, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function deleteReasonItemApi(id) {
    return new Promise((resolve, reject) => {
        axios.delete(API_URLS.order.reasonItem.delete(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}




export function createReasonItemApi(data) {
    return new Promise((resolve, reject) => {
        axios.post(API_URLS.order.reasonItem.create, data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function getReasonItemDetailsApis(id) {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.reasonItem.details(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function editReasonItemApis(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(API_URLS.order.reasonItem.edit(id), data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}


