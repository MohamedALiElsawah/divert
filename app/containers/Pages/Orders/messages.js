/*
 * Blank Page Messages
 *
 * This contains all the text for the Blank Page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'orders';

export default defineMessages({
  filterTitle: {
    id: `${scope}.filterTitle`,
    defaultMessage: 'Orders of',
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'this field is required',
  },
  phoneRegx: {
    id: `${scope}.phoneRegx`,
    defaultMessage: 'Only Kuwait phone form allowed',
  },

  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
  today: {
    id: `${scope}.today`,
    defaultMessage: 'Today',
  },
  tomorrow: {
    id: `${scope}.tomorrow`,
    defaultMessage: 'Tomorrow',
  },
  yesterday: {
    id: `${scope}.yesterday`,
    defaultMessage: 'Yesterday',
  },
  orderNum: {
    id: `${scope}.orderNum`,
    defaultMessage: 'Order number',
  },
  refNum: {
    id: `${scope}.refNum`,
    defaultMessage: 'Refrence number',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status',
  },
  client: {
    id: `${scope}.client`,
    defaultMessage: 'Client',
  },
  branch: {
    id: `${scope}.branch`,
    defaultMessage: 'Branch',
  },
  receiverName: {
    id: `${scope}.receiverName`,
    defaultMessage: 'Receiver name',
  },
  receiverPhone: {
    id: `${scope}.receiverPhone`,
    defaultMessage: 'Receiver phone',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  orderCreateMsg: {
    id: `${scope}.orderCreateMsg`,
    defaultMessage: 'Order created successfully!',
  },
  createOrder: {
    id: `${scope}.createOrder`,
    defaultMessage: 'Create order',
  },
  addReciverAddress: {
    id: `${scope}.addReciverAddress`,
    defaultMessage: 'Add Receiver Address',
  },
  selectClientFirst: {
    id: `${scope}.selectClientFirst`,
    defaultMessage: 'Select client first',
  },
  enterQr: {
    id: `${scope}.enterQr`,
    defaultMessage: 'Enter QR Code',
  },
  qr: {
    id: `${scope}.qr`,
    defaultMessage: 'QR Code',
  },
  senderAddress: {
    id: `${scope}.senderAddress`,
    defaultMessage: 'Sender address',
  },
  reciverAddress: {
    id: `${scope}.reciverAddress`,
    defaultMessage: 'Receiver Address',
  },
  plan: {
    id: `${scope}.plan`,
    defaultMessage: 'Plan',
  },
  paymentMethod: {
    id: `${scope}.paymentMethod`,
    defaultMessage: 'Payment method',
  },
  cash: {
    id: `${scope}.cash`,
    defaultMessage: 'Cash',
  },
  credit: {
    id: `${scope}.credit`,
    defaultMessage: 'Credit',
  },
  quantity: {
    id: `${scope}.quantity`,
    defaultMessage: 'Quantity',
  },
  weight: {
    id: `${scope}.weight`,
    defaultMessage: 'Weight',
  },
  pickupDate: {
    id: `${scope}.pickupDate`,
    defaultMessage: 'Pickup date',
  },
  pickupTime: {
    id: `${scope}.pickupTime`,
    defaultMessage: 'Pickup time',
  },
  type: {
    id: `${scope}.type`,
    defaultMessage: 'Delivery type',
  },

  immediatly: {
    id: `${scope}.immediatly`,
    defaultMessage: 'Immediatly',
  },
  scheduled: {
    id: `${scope}.scheduled`,
    defaultMessage: 'Scheduled',
  },
  notes: {
    id: `${scope}.notes`,
    defaultMessage: 'Notes',
  },
  continueCreate: {
    id: `${scope}.continueCreate`,
    defaultMessage: 'Create',
  },
  editOrder: {
    id: `${scope}.editOrder`,
    defaultMessage: 'Edit order',
  },
  continueUpdate: {
    id: `${scope}.continueUpdate`,
    defaultMessage: 'Edit ',
  },
  statusChangedMsg: {
    id: `${scope}.statusChangedMsg`,
    defaultMessage: 'Status Changed successfully!',
  },

  driverChangedMsg: {
    id: `${scope}.driverChangedMsg`,
    defaultMessage: 'Driver Assigned successfully!',
  },
  orderData: {
    id: `${scope}.orderData`,
    defaultMessage: 'Order data',
  },

  driverData: {
    id: `${scope}.driverData`,
    defaultMessage: 'Driver data',
  },
  changeStatus: {
    id: `${scope}.changeStatus`,
    defaultMessage: 'Change Status',
  },
  assignDriver: {
    id: `${scope}.assignDriver`,
    defaultMessage: 'Assign driver',
  },
  receiverData: {
    id: `${scope}.receiverData`,
    defaultMessage: 'receiver data',
  },
  senderData: {
    id: `${scope}.senderData`,
    defaultMessage: 'Sender data',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  paperTitle: {
    id: `${scope}.paperTitle`,
    defaultMessage: 'List all clients ',
  },
  createClient: {
    id: `${scope}.createClient`,
    defaultMessage: 'Create Client',
  },
  editClient: {
    id: `${scope}.editClient`,
    defaultMessage: 'Edit Client',
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Phone',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  history: {
    id: `${scope}.history`,
    defaultMessage: 'Order history',
  },
  selectStatus: {
    id: `${scope}.selectStatus`,
    defaultMessage: 'Select Status',
  },
  selectReason: {
    id: `${scope}.selectReason`,
    defaultMessage: 'Select reason',
  },
  selectSubReason: {
    id: `${scope}.selectSubReason`,
    defaultMessage: 'Select sub reason',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  change: {
    id: `${scope}.change`,
    defaultMessage: 'Change',
  },

  driver: {
    id: `${scope}.driver`,
    defaultMessage: 'Driver',
  },

  sure: {
    id: `${scope}.sure`,
    defaultMessage: 'Are you sure?',
  },
  sureBody: {
    id: `${scope}.sureBody`,
    defaultMessage: 'Once deleted, you will not be able to recover this!',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Success',
  },
  deleted: {
    id: `${scope}.deleted`,
    defaultMessage: 'Deleted!',
  },
  OK: {
    id: `${scope}.OK`,
    defaultMessage: 'OK',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },

});
