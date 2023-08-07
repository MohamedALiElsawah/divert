
import { API_URLS } from '../../../api/serviceURL';
import axios from 'axios';
import Cookies from 'js-cookie'
import client from './client';

let headers={
    headers:{
     'Authorization':'Bearer '+Cookies.get('payload'),
    }
}


export function getClientsApi() {
            return new Promise((resolve, reject) => {
            axios.get(API_URLS.clients.list,headers).then((res) => {
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







export function getBranchesApi(clientId) {
    let params ={
        client_id:clientId

    }
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.branch.list,
        {
        params: clientId?{
            client_id: clientId
        }:{},
        headers:headers.headers
      },
       
        ).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}


export function createBranchApi(data) {
  
    return new Promise((resolve, reject) => {
    axios.post(API_URLS.branch.create, data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}


export function deleteBranchApi(id) {
  
    return new Promise((resolve, reject) => {
    axios.delete(API_URLS.branch.delete(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}


export function getBranchDetailsApi(id) {
  
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.branch.details(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}

export function updateBranchApi(id,data) {
  
    return new Promise((resolve, reject) => {
    axios.put(API_URLS.branch.edit(id),data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}





export function getAddressApi(clientId) {
  
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.address.list,
        {
        params: clientId?{
            client_id: clientId
        }:{},
        headers:headers.headers
      },
       
        ).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}


export function createAddressApi(data) {
  
    return new Promise((resolve, reject) => {
    axios.post(API_URLS.address.create, data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}


export function deleteAddressApi(id) {
  
    return new Promise((resolve, reject) => {
    axios.delete(API_URLS.address.delete(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}


export function getAddressDetailsApi(id) {
  
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.address.details(id),headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}

export function updateAddressApi(id,data) {
  
    return new Promise((resolve, reject) => {
    axios.put(API_URLS.address.edit(id),data,headers).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response);
    });
});
}






export function getPlansApi(clientId) {
  
    return new Promise((resolve, reject) => {
    axios.get(API_URLS.order.plan.list,
        {
        params: clientId?{
            client_id: clientId
        }:{},
        headers:headers.headers
      },
       
        ).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err.response.data);
    });
});
}



export function deletePlanApi(id) {
    return new Promise((resolve, reject) => {
        axios.delete(API_URLS.order.plan.delete(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}




export function createPlanApi(data) {
    return new Promise((resolve, reject) => {
        axios.post(API_URLS.order.plan.create, data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function getPlanDetailsApi(id) {
    return new Promise((resolve, reject) => {
        axios.get(API_URLS.order.plan.details(id), headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}

export function editPlanApi(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(API_URLS.order.plan.edit(id), data, headers).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}





