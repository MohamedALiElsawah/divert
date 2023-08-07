
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URLS } from '../../../api/serviceURL';

const headers = {
  headers: {
    Authorization: 'Bearer ' + Cookies.get('payload'),
  }
};


export function getUsersApi() {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.user.list, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

export function getUserDataAPI(id) {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.user.details(id), headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}


export function createUserApi(data) {
  return new Promise((resolve, reject) => {
    axios.post(API_URLS.user.create, data, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}

export function deleteClientApi(id) {
  return new Promise((resolve, reject) => {
    axios.delete(API_URLS.clients.delete(id), headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}


export function getClientDataApi(id) {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.clients.details(id), headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}

export function updateClientApi(id, data) {
  return new Promise((resolve, reject) => {
    axios.put(API_URLS.clients.edit(id), data, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}


export function getBranchesApi(clientId) {
  const params = {
    client_id: clientId

  };
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.branch.list,
      {
        params: clientId ? {
          client_id: clientId
        } : {},
        headers: headers.headers
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
    axios.post(API_URLS.branch.create, data, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}


export function deleteBranchApi(id) {
  return new Promise((resolve, reject) => {
    axios.delete(API_URLS.branch.delete(id), headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}


export function getBranchDetailsApi(id) {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.branch.details(id), headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}

export function updateBranchApi(id, data) {
  return new Promise((resolve, reject) => {
    axios.put(API_URLS.branch.edit(id), data, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    });
  });
}
