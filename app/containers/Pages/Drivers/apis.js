
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URLS } from '../../../api/serviceURL';

const headers = {
  headers: {
    Authorization: 'Bearer ' + Cookies.get('payload'),
  }
};


export function getDriversApi() {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.drivers.list, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

export function getStatisticsApi() {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.statistics.list, headers).then((res) => {
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


export function createOrderApi(data) {
  return new Promise((resolve, reject) => {
    axios.post(API_URLS.order.order.create, data, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

export function getOrderDetailsApi(id) {
  console.log('hahaha');
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.order.order.details(id), headers).then((res) => {
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


export function getStatusesApi(id) {
  return new Promise((resolve, reject) => {
    axios.get(API_URLS.order.details.getStatuses, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}


export function changeOrderStatusApi(data) {
  return new Promise((resolve, reject) => {
    axios.post(API_URLS.order.details.changeStatus, data, headers).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}
export function AssignDriverApi(data) {
  return new Promise((resolve, reject) => {
    axios.post(API_URLS.order.details.assignDriver, data, headers).then((res) => {
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
