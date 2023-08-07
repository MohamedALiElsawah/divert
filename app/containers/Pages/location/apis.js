
import { API_URLS } from '../../../api/serviceURL';
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

export function deleteGovernorateApi(id) {
    return new Promise((resolve, reject) => {
    axios.delete(API_URLS.location.governorate.delete(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}




export function createGovernorateApi(data) {
    return new Promise((resolve, reject) => {
    axios.post(API_URLS.location.governorate.create,data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function getGovernorateDetailsApi(id) {
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.location.governorate.details(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function editGovernorateApi(id,data) {
    return new Promise((resolve, reject) => {
    axios.put(API_URLS.location.governorate.edit(id),data,headers).then((res) => {
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

export function deleteAreaApi(id) {
    return new Promise((resolve, reject) => {
    axios.delete(API_URLS.location.areas.delete(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function createAreaApi(data) {
    return new Promise((resolve, reject) => {
    axios.post(API_URLS.location.areas.create,data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}


export function getAreaDetailsApi(id) {
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.location.areas.details(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function editAreaApi(id,data) {
    return new Promise((resolve, reject) => {
    axios.put(API_URLS.location.areas.edit(id),data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}


export function getBlocksApis() {
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.location.blocks.list,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}




export function deleteBlockApi(id) {
    return new Promise((resolve, reject) => {
    axios.delete(API_URLS.location.blocks.delete(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function createBlockApi(data) {
    return new Promise((resolve, reject) => {
    axios.post(API_URLS.location.blocks.create,data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}



export function getBlockDetailsApi(id) {
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.location.blocks.details(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function editBlockApi(id,data) {
    return new Promise((resolve, reject) => {
    axios.put(API_URLS.location.blocks.edit(id),data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}

export function createClientApi(data) {
  
        return new Promise((resolve, reject) => {
        axios.post(API_URLS.clients.create, data,headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response);
        });
    });
}

export function deleteClientApi(id) {
  
    return new Promise((resolve, reject) => {
    axios.delete(API_URLS.clients.delete(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}




export function getClientDataApi(id) {
  
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.clients.details(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}

export function updateClientApi(id,data) {
  
    return new Promise((resolve, reject) => {
    axios.put(API_URLS.clients.edit(id),data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}

