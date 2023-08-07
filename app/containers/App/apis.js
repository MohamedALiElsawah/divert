
import { API_URLS } from '../../api/serviceURL';
import axios from 'axios';
import Cookies from 'js-cookie'

let headers={
    headers:{
     'Authorization':'Bearer '+Cookies.get('payload'),
    }
}

export function getGovernorateApi() {
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.location.governorate.list,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}


export function getAreasApis() {
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.location.areas.list,headers).then((res) => {
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

export function getClientsApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.clients.list, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function getRolesApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.roles.list, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function getClientsLookupsApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.lookups.clientsBranch, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}


export function getAddressLookupsApi() {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.lookups.addresslookups, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}


