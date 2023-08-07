const BaseUrl = 'https://development.rseem.co/divert/api';

export const API_URLS = {
  drivers: {
    list: `${BaseUrl}/track-drivers`,
  },
  statistics: {
    list: (filter) => `${BaseUrl}/statistics?key=${filter}`,
  },
  roles: {
    list: `${BaseUrl}/role`,
  },
  user: {
    list: `${BaseUrl}/list-users`,
    create: `${BaseUrl}/user/register`,
    details: (id) => `${BaseUrl}/user/${id}`,
  },
  auth: {
    loginAgent: `${BaseUrl}/user/login`,
    loginClient: `${BaseUrl}/client/login`,
    // list: (page, size) => `${DELIVERYSERVICE}/announcements/management/list?page=${page}&size=${size}`,
  },
  register: {
    registerUser: `${BaseUrl}/user/register`,
  },
  lookups: {
    roles: `${BaseUrl}/role`,
    clientsBranch: `${BaseUrl}/list-clients`,
    addresslookups: `${BaseUrl}/lookup-governorate`,
  },
  clients: {
    list: `${BaseUrl}/client`,
    create: `${BaseUrl}/client/register`,
    edit: (id) => `${BaseUrl}/client/${id}`,
    delete: (id) => `${BaseUrl}/client/${id}`,
    details: (id) => `${BaseUrl}/client/${id}`,
  },
  branch: {
    list: `${BaseUrl}/branch`,
    create: `${BaseUrl}/branch`,
    edit: (id) => `${BaseUrl}/branch/${id}`,
    delete: (id) => `${BaseUrl}/branch/${id}`,
    details: (id) => `${BaseUrl}/branch/${id}`,
  },
  address: {
    list: `${BaseUrl}/address`,
    create: `${BaseUrl}/address`,
    edit: (id) => `${BaseUrl}/address/${id}`,
    delete: (id) => `${BaseUrl}/address/${id}`,
    details: (id) => `${BaseUrl}/address/${id}`,
  },
  location: {
    governorate: {
      list: `${BaseUrl}/governorate`,
      delete: (id) => `${BaseUrl}/governorate/${id}`,
      create: `${BaseUrl}/governorate`,
      details: (id) => `${BaseUrl}/governorate/${id}`,
      edit: (id) => `${BaseUrl}/governorate/${id}`,
    },

    areas: {
      list: `${BaseUrl}/area`,
      delete: (id) => `${BaseUrl}/area/${id}`,
      create: `${BaseUrl}/area`,
      details: (id) => `${BaseUrl}/area/${id}`,
      edit: (id) => `${BaseUrl}/area/${id}`,
    },

    blocks: {
      list: `${BaseUrl}/block`,
      delete: (id) => `${BaseUrl}/block/${id}`,
      create: `${BaseUrl}/block`,
      details: (id) => `${BaseUrl}/block/${id}`,
      edit: (id) => `${BaseUrl}/block/${id}`,
    },
  },

  order: {
    details: {
      getStatuses: `${BaseUrl}/status-with-reasons`,
      changeStatus: `${BaseUrl}/change-status`,
      drivers: `${BaseUrl}/list-drivers`,
      assignDriver: `${BaseUrl}/assign-driver`,
      delete: (id) => `${BaseUrl}/order`,
    },
    order: {
      list: `${BaseUrl}/order`,
      details: (id) => `${BaseUrl}/order/${id}`,
      create: `${BaseUrl}/order`,
    },
    status: {
      list: `${BaseUrl}/status`,
      delete: (id) => `${BaseUrl}/status/${id}`,
      create: `${BaseUrl}/status`,
      details: (id) => `${BaseUrl}/status/${id}`,
      edit: (id) => `${BaseUrl}/status/${id}`,
    },
    reason: {
      list: `${BaseUrl}/reason`,
      delete: (id) => `${BaseUrl}/reason/${id}`,
      create: `${BaseUrl}/reason`,
      details: (id) => `${BaseUrl}/reason/${id}`,
      edit: (id) => `${BaseUrl}/reason/${id}`,
    },
    reasonItem: {
      list: `${BaseUrl}/reason-item`,
      delete: (id) => `${BaseUrl}/reason-item/${id}`,
      create: `${BaseUrl}/reason-item`,
      details: (id) => `${BaseUrl}/reason-item/${id}`,
      edit: (id) => `${BaseUrl}/reason-item/${id}`,
    },

    plan: {
      list: `${BaseUrl}/pricing-plan`,
      delete: (id) => `${BaseUrl}/pricing-plan/${id}`,
      create: `${BaseUrl}/pricing-plan`,
      details: (id) => `${BaseUrl}/pricing-plan/${id}`,
      edit: (id) => `${BaseUrl}/pricing-plan/${id}`,
    },
  },
};
